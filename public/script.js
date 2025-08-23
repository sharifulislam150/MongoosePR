document.addEventListener('DOMContentLoaded', function() {
    // Create modal element
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">Confirm Delete</h3>
            <p class="modal-message">Are you sure you want to delete this chat? This action cannot be undone.</p>
            <div class="modal-buttons">
                <button class="modal-btn modal-btn-cancel">Cancel</button>
                <button class="modal-btn modal-btn-confirm">Delete</button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(modalOverlay);
    
    // Get references to modal elements
    const modal = document.querySelector('.modal-overlay');
    const cancelBtn = document.querySelector('.modal-btn-cancel');
    const confirmBtn = document.querySelector('.modal-btn-confirm');
    
    let deleteForm = null;
    
    // Add event listeners to all delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent form of the clicked button
            deleteForm = this.closest('form');
            
            // Show the modal
            modal.style.display = 'flex';
        });
    });
    
    // Confirm delete
    confirmBtn.addEventListener('click', function() {
        if (deleteForm) {
            deleteForm.submit();
        }
    });
    
    // Cancel delete
    cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        deleteForm = null;
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            deleteForm = null;
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            deleteForm = null;
        }
    });
});