/**
 * KMeans Clustering Algorithm Implementation
 * Used for image compression by reducing color palette
 */

class KMeans {
    constructor(k, maxIterations = 100) {
        this.k = k;
        this.maxIterations = maxIterations;
        this.centroids = [];
    }

    /**
     * Initialize centroids randomly from the dataset
     * @param {Array} data - Array of data points (RGB pixels)
     * @returns {Array} Initial centroids
     */
    initializeCentroids(data) {
        const centroids = [];
        for (let i = 0; i < this.k; i++) {
            const randomIndex = Math.floor(Math.random() * data.length);
            centroids.push([...data[randomIndex]]);
        }
        return centroids;
    }

    /**
     * Calculate Euclidean distance between two points
     * @param {Array} point1 - First point [r, g, b]
     * @param {Array} point2 - Second point [r, g, b]
     * @returns {number} Distance between points
     */
    distance(point1, point2) {
        return Math.sqrt(
            point1.reduce((sum, val, i) => sum + Math.pow(val - point2[i], 2), 0)
        );
    }

    /**
     * Assign each data point to the nearest centroid
     * @param {Array} data - Array of data points
     * @param {Array} centroids - Current centroids
     * @returns {Array} Cluster assignments for each point
     */
    assignToClusters(data, centroids) {
        return data.map(point => {
            let minDistance = Infinity;
            let clusterIndex = 0;
            
            centroids.forEach((centroid, index) => {
                const dist = this.distance(point, centroid);
                if (dist < minDistance) {
                    minDistance = dist;
                    clusterIndex = index;
                }
            });
            
            return clusterIndex;
        });
    }

    /**
     * Update centroids based on assigned points
     * @param {Array} data - Array of data points
     * @param {Array} assignments - Cluster assignments
     * @returns {Array} Updated centroids
     */
    updateCentroids(data, assignments) {
        const newCentroids = [];
        
        for (let i = 0; i < this.k; i++) {
            const clusterPoints = data.filter((_, index) => assignments[index] === i);
            
            if (clusterPoints.length === 0) {
                // If no points assigned to this centroid, keep it the same
                newCentroids.push([...this.centroids[i]]);
            } else {
                // Calculate mean of assigned points
                const centroid = clusterPoints[0].map((_, dim) =>
                    clusterPoints.reduce((sum, point) => sum + point[dim], 0) / clusterPoints.length
                );
                newCentroids.push(centroid);
            }
        }
        
        return newCentroids;
    }

    /**
     * Check if centroids have converged
     * @param {Array} oldCentroids - Previous centroids
     * @param {Array} newCentroids - Current centroids
     * @returns {boolean} True if converged
     */
    hasConverged(oldCentroids, newCentroids) {
        const threshold = 0.001;
        return oldCentroids.every((centroid, index) =>
            centroid.every((val, dim) => Math.abs(val - newCentroids[index][dim]) < threshold)
        );
    }

    /**
     * Main KMeans clustering algorithm
     * @param {Array} data - Array of data points to cluster
     * @returns {Array} Final cluster assignments
     */
    fit(data) {
        // Initialize centroids
        this.centroids = this.initializeCentroids(data);
        
        // Iterate until convergence or max iterations
        for (let iteration = 0; iteration < this.maxIterations; iteration++) {
            // Assign points to clusters
            const assignments = this.assignToClusters(data, this.centroids);
            
            // Update centroids
            const newCentroids = this.updateCentroids(data, assignments);
            
            // Check for convergence
            if (this.hasConverged(this.centroids, newCentroids)) {
                console.log(`KMeans converged after ${iteration + 1} iterations`);
                break;
            }
            
            this.centroids = newCentroids;
        }
        
        // Return final cluster assignments
        return this.assignToClusters(data, this.centroids);
    }
}

/**
 * Compress image using KMeans clustering
 * @param {ImageData} imageData - Canvas ImageData object
 * @param {number} nColors - Number of colors to reduce to
 * @returns {ImageData} Compressed image data
 */
function compressImage(imageData, nColors) {
    const { data, width, height } = imageData;
    
    // Extract RGB values from image data
    const pixels = [];
    for (let i = 0; i < data.length; i += 4) {
        pixels.push([data[i], data[i + 1], data[i + 2]]); // R, G, B
    }
    
    // Apply KMeans clustering
    const kmeans = new KMeans(nColors);
    const assignments = kmeans.fit(pixels);
    
    // Create compressed image data
    const compressedData = new Uint8ClampedArray(data.length);
    
    for (let i = 0; i < pixels.length; i++) {
        const clusterIndex = assignments[i];
        const centroid = kmeans.centroids[clusterIndex];
        
        const pixelIndex = i * 4;
        compressedData[pixelIndex] = Math.round(centroid[0]);     // R
        compressedData[pixelIndex + 1] = Math.round(centroid[1]); // G
        compressedData[pixelIndex + 2] = Math.round(centroid[2]); // B
        compressedData[pixelIndex + 3] = data[pixelIndex + 3];    // A (alpha)
    }
    
    return new ImageData(compressedData, width, height);
}