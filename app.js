/**
 * Main application logic for Image Compression web app
 * Handles user interactions and image processing workflow
 */

// DOM element references
const fileInput = document.getElementById('file');
const nColorsInput = document.getElementById('n_colors');
const compressBtn = document.getElementById('compressBtn');
const loadingDiv = document.getElementById('loading');
const resultDiv = document.getElementById('result');
const resultImage = document.getElementById('resultImage');

/**
 * Validate user inputs
 * @returns {Object} Validation result with isValid flag and error message
 */
function validateInputs() {
    if (!fileInput.files[0]) {
        return { isValid: false, message: 'Please select an image file.' };
    }
    
    const nColors = parseInt(nColorsInput.value);
    if (isNaN(nColors) || nColors < 2 || nColors > 256) {
        return { isValid: false, message: 'Number of colors must be between 2 and 256.' };
    }
    
    // Check file type
    const file = fileInput.files[0];
    if (!file.type.startsWith('image/')) {
        return { isValid: false, message: 'Please select a valid image file.' };
    }
    
    return { isValid: true };
}

/**
 * Show loading state
 */
function showLoading() {
    loadingDiv.style.display = 'block';
    resultDiv.style.display = 'none';
    compressBtn.disabled = true;
}

/**
 * Hide loading state
 */
function hideLoading() {
    loadingDiv.style.display = 'none';
    compressBtn.disabled = false;
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    alert(message);
    hideLoading();
}

/**
 * Create side-by-side comparison image
 * @param {HTMLCanvasElement} originalCanvas - Original image canvas
 * @param {HTMLCanvasElement} compressedCanvas - Compressed image canvas
 * @returns {string} Data URL of combined image
 */
function createComparisonImage(originalCanvas, compressedCanvas) {
    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');
    
    const width = originalCanvas.width;
    const height = originalCanvas.height;
    
    // Set combined canvas size (original + compressed side by side)
    combinedCanvas.width = width * 2;
    combinedCanvas.height = height;
    
    // Draw original image on the left
    combinedCtx.drawImage(originalCanvas, 0, 0);
    
    // Draw compressed image on the right
    combinedCtx.drawImage(compressedCanvas, width, 0);
    
    return combinedCanvas.toDataURL();
}

/**
 * Process the selected image file
 * @param {File} file - Selected image file
 * @param {number} nColors - Number of colors for compression
 */
function processImage(file, nColors) {
    const img = new Image();
    
    img.onload = function() {
        try {
            // Create canvas for original image
            const originalCanvas = document.createElement('canvas');
            const originalCtx = originalCanvas.getContext('2d');
            
            originalCanvas.width = img.width;
            originalCanvas.height = img.height;
            originalCtx.drawImage(img, 0, 0);
            
            // Get image data for processing
            const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
            
            // Process image compression in next tick to allow UI update
            setTimeout(() => {
                try {
                    // Apply KMeans compression
                    const compressedImageData = compressImage(imageData, nColors);
                    
                    // Create canvas for compressed image
                    const compressedCanvas = document.createElement('canvas');
                    const compressedCtx = compressedCanvas.getContext('2d');
                    compressedCanvas.width = img.width;
                    compressedCanvas.height = img.height;
                    compressedCtx.putImageData(compressedImageData, 0, 0);
                    
                    // Create side-by-side comparison
                    const comparisonImageUrl = createComparisonImage(originalCanvas, compressedCanvas);
                    
                    // Display result
                    resultImage.src = comparisonImageUrl;
                    resultDiv.style.display = 'block';
                    
                    hideLoading();
                    
                } catch (error) {
                    console.error('Error during image compression:', error);
                    showError('Error processing image. Please try again with a smaller image or fewer colors.');
                }
            }, 100);
            
        } catch (error) {
            console.error('Error loading image:', error);
            showError('Error loading image. Please try a different image file.');
        }
    };
    
    img.onerror = function() {
        showError('Error loading image. Please check the file format and try again.');
    };
    
    // Load the image
    img.src = URL.createObjectURL(file);
}

/**
 * Handle compress button click
 */
function handleCompress() {
    // Validate inputs
    const validation = validateInputs();
    if (!validation.isValid) {
        showError(validation.message);
        return;
    }
    
    // Get values
    const file = fileInput.files[0];
    const nColors = parseInt(nColorsInput.value);
    
    // Show loading and process image
    showLoading();
    processImage(file, nColors);
}

/**
 * Handle file input change
 */
function handleFileChange() {
    // Hide previous results when new file is selected
    resultDiv.style.display = 'none';
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    compressBtn.addEventListener('click', handleCompress);
    fileInput.addEventListener('change', handleFileChange);
    
    // Allow enter key to trigger compression
    nColorsInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleCompress();
        }
    });
}

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('Image Compression App initialized');
    initializeEventListeners();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);