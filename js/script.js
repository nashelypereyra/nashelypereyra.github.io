document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('upload-form');
    const imageInput = document.getElementById('image-input');
    const gallery = document.getElementById('gallery');
    const modalImage = document.getElementById('modal-image');
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

    loadGallery();

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64Image = reader.result;
                saveImage(base64Image);
                imageInput.value = ''; 
                loadGallery(); 
            };
            reader.readAsDataURL(file);
        }
    });

    function saveImage(base64Image) {
        let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
        images.push(base64Image);
        localStorage.setItem('galleryImages', JSON.stringify(images));
    }

    function loadGallery() {
        gallery.innerHTML = '';
        const images = JSON.parse(localStorage.getItem('galleryImages')) || [];
        images.forEach((image, index) => {
            const col = document.createElement('div');
            col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');
            col.innerHTML = `
                <div class="card">
                    <img src="${image}" class="card-img-top" data-index="${index}" alt="Imagen">
                    <div class="card-body text-center">
                        <button class="btn btn-danger btn-sm" onclick="deleteImage(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            gallery.appendChild(col);

            col.querySelector('img').addEventListener('click', function () {
                modalImage.src = image;
                imageModal.show();
            });
        });
    }

    window.deleteImage = function (index) {
        let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
        images.splice(index, 1);
        localStorage.setItem('galleryImages', JSON.stringify(images));
        loadGallery(); 
    };
});
