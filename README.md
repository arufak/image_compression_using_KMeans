# Image Compression using KMeans Clustering

## 🎯 Project Overview

This project implements image compression using the KMeans clustering algorithm to reduce the color palette of images. Users can upload an image, specify the desired number of colors, and view a side-by-side comparison of the original and compressed versions. The application showcases how unsupervised machine learning can be applied to practical image processing tasks.

## 🌟 Features

- **Interactive Web Interface**: Simple, user-friendly design for easy image upload and processing
- **Real-time Compression**: Process images directly in the browser using JavaScript
- **Customizable Compression**: Adjust the number of colors (2-256) to control compression level
- **Visual Comparison**: Side-by-side display of original and compressed images
- **Cross-platform Compatibility**: Works on any device with a modern web browser

## 🛠️ Tools and Technologies Used

### Backend (Original Flask Version)
- **Python 3.x**: Core programming language
- **Flask**: Web framework for creating the application
- **scikit-learn**: Machine learning library for KMeans implementation
- **PIL (Pillow)**: Image processing and manipulation
- **NumPy**: Numerical computing for array operations

### Frontend (Static GitHub Pages Version)
- **HTML5**: Structure and layout
- **CSS3**: Styling and responsive design
- **JavaScript**: Client-side KMeans implementation and image processing
- **Canvas API**: Image manipulation and rendering

### Deployment
- **GitHub Pages**: Static web hosting
- **Git**: Version control

## 🚧 Challenges Faced

### 1. **Algorithm Implementation**
- **Challenge**: Implementing KMeans clustering from scratch to understand the underlying mathematics
- **Solution**: Broke down the algorithm into discrete steps: centroid initialization, cluster assignment, centroid updates, and convergence checking

### 2. **Image Processing Pipeline**
- **Challenge**: Converting images between different formats (PIL Image → NumPy array → processed data → display format)
- **Solution**: Created a systematic pipeline using PIL and NumPy to handle image transformations efficiently

### 3. **Performance Optimization**
- **Challenge**: Large images with high resolution caused slow processing and potential browser crashes
- **Solution**: Implemented image resizing for large files and optimized the clustering algorithm with better initialization methods

### 4. **Deployment Challenges**
- **Challenge**: Initial attempt to deploy Flask app on Vercel encountered serverless function limitations
- **Solution**: Pivoted to a client-side JavaScript implementation that runs entirely in the browser, making it perfect for GitHub Pages

### 5. **Cross-platform Compatibility**
- **Challenge**: Ensuring the application works consistently across different browsers and devices
- **Solution**: Used standard web APIs and implemented responsive design principles

## 💡 Solutions Implemented

### Technical Solutions
1. **KMeans++ Initialization**: Improved centroid initialization for better clustering results
2. **Progressive Processing**: Used asynchronous processing to prevent UI blocking
3. **Memory Management**: Efficient handling of image data to prevent memory issues
4. **Error Handling**: Comprehensive validation for file types and input parameters

### User Experience Solutions
1. **Visual Feedback**: Loading indicators and progress updates during processing
2. **Input Validation**: Clear error messages and input constraints
3. **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🌍 Impact and Applications

### Educational Impact
- **Machine Learning Visualization**: Provides an intuitive demonstration of unsupervised learning
- **Algorithm Understanding**: Helps students visualize how KMeans clustering works in practice
- **Image Processing Education**: Teaches fundamental concepts of digital image manipulation

### Practical Applications
- **Bandwidth Optimization**: Reduce image file sizes for faster web loading
- **Storage Efficiency**: Compress images while maintaining visual quality
- **Artistic Effects**: Create stylized, poster-like versions of photographs
- **Data Preprocessing**: Prepare images for further machine learning tasks

### Broader Implications
- **Accessibility**: Makes advanced image processing accessible without specialized software
- **Environmental Impact**: Smaller image files reduce bandwidth usage and energy consumption
- **Creative Applications**: Enables artists and designers to explore color reduction techniques

## 🚀 How to Use

### Online Version (Recommended)
1. Visit [https://arufak.github.io/CS506_Lab2/](https://arufak.github.io/CS506_Lab2/)
2. Click "Select an image" and choose your image file
3. Adjust the "Number of colors" (2-256) based on desired compression level
4. Click "Compress Image" and wait for processing
5. View the side-by-side comparison of original vs compressed image

### Local Development
1. Clone the repository:
   ```bash
   git clone git@github.com:arufak/CS506_Lab2.git
   cd CS506_Lab2
   ```
2. Open `index.html` in your web browser
3. Or run a local server:
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

## 📊 Technical Details

### KMeans Algorithm Implementation
The application implements the complete KMeans clustering algorithm:
1. **Initialization**: Random selection of initial centroids
2. **Assignment**: Each pixel assigned to nearest centroid based on Euclidean distance
3. **Update**: Centroids recalculated as mean of assigned pixels
4. **Convergence**: Process repeats until centroids stabilize

### Image Processing Flow
1. **Upload**: User selects image file
2. **Canvas Rendering**: Image drawn to HTML5 canvas
3. **Pixel Extraction**: RGB values extracted from canvas image data
4. **Clustering**: KMeans applied to pixel RGB values
5. **Reconstruction**: Pixels replaced with cluster centroid colors
6. **Display**: Original and compressed images shown side-by-side

## 🎓 Learning Outcomes

This project demonstrates:
- **Unsupervised Machine Learning**: Practical application of KMeans clustering
- **Image Processing**: Digital image manipulation and color space understanding
- **Web Development**: Full-stack development from backend to frontend
- **Algorithm Implementation**: Converting theoretical concepts into working code
- **Problem Solving**: Overcoming deployment and performance challenges

## 📝 Future Enhancements

- **Multiple Algorithms**: Add other clustering algorithms (DBSCAN, Hierarchical)
- **Format Support**: Support for additional image formats (WEBP, TIFF)
- **Batch Processing**: Process multiple images simultaneously
- **Quality Metrics**: Implement PSNR and SSIM for compression quality assessment
- **Download Feature**: Allow users to download compressed images

