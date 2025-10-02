// Premium Order Management System with Extraordinary Effects
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Premium Order System Loading...');
    
    // Initialize all components
    initializeQuantityControls();
    initializeDeliveryOptions();
    initializePromoCode();
    initializePlaceOrderButton();
    initializeFormValidation();
    initializePremiumEffects();
    
    // Update initial summary
    updateOrderSummary();
    
    console.log('✨ Premium Order System Ready!');

    /* === Enhancement Suite Initialization (Oct 2025) === */
    initFooterReveal();
    initMetricCounters();
    initStickyTotalSync();
    initFooterThemeToggle();
    initGlobalTheme();
    
    // Quantity Controls with Premium Effects
    function initializeQuantityControls() {
        const qtyButtons = document.querySelectorAll('.quantity-control button');
        const qtyInputs = document.querySelectorAll('.quantity-control input');
        
        qtyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                createRippleEffect(this, e);
                
                const input = this.parentNode.querySelector('input[type="number"]');
                const currentValue = parseInt(input.value);
                const isIncrement = this.textContent === '+';
                
                if (isIncrement) {
                    input.value = currentValue + 1;
                } else if (currentValue > 1) {
                    input.value = currentValue - 1;
                }
                
                updateItemTotal(input);
                showQuantityFeedback(input);
            });
        });
        
        qtyInputs.forEach(input => {
            input.addEventListener('change', function() {
                if (parseInt(this.value) < 1) {
                    this.value = 1;
                }
                updateItemTotal(this);
            });
        });
    }
    
    // Create ripple effect for buttons
    function createRippleEffect(button, e) {
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 159, 0, 0.6);
            border-radius: 50%;
            transform: scale(0);
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Show quantity update feedback
    function showQuantityFeedback(input) {
        const feedback = document.createElement('div');
        feedback.textContent = `Updated to ${input.value}`;
        feedback.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-orange);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            animation: feedbackSlide 2s ease-out forwards;
            z-index: 1000;
            white-space: nowrap;
        `;
        
        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(feedback);
        
        setTimeout(() => feedback.remove(), 2000);
    }
    
    // Update individual item total
    function updateItemTotal(input) {
        const orderItem = input.closest('.order-item');
        const quantity = parseInt(input.value);
        let price;
        
        // Determine base price by item
        if (orderItem.querySelector('h3').textContent.includes('Bucket')) {
            price = 29.99;
        } else {
            price = 14.99;
        }
        
        const priceElement = orderItem.querySelector('.item-price .price');
        if (priceElement) {
            priceElement.textContent = `$${(price * quantity).toFixed(2)}`;
        }
        
        updateOrderSummary();
    }
    
    // Delivery Options with Enhanced Interaction
    function initializeDeliveryOptions() {
        const deliveryOptions = document.querySelectorAll('.delivery-option');
        
        deliveryOptions.forEach(option => {
            option.addEventListener('click', function() {
                const radio = this.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
                
                updateOrderSummary();
                showDeliveryUpdateFeedback();
            });
        });
    }
    
    // Show delivery update feedback
    function showDeliveryUpdateFeedback() {
        showNotification('<i class="fas fa-truck"></i> Delivery option updated', 'info');
    }
    
    // Update complete order summary
    function updateOrderSummary() {
        const bucketInput = document.querySelector('.order-item:first-child .quantity-control input');
        const mugInput = document.querySelector('.order-item:last-child .quantity-control input');
        
        const bucketQty = parseInt(bucketInput?.value) || 1;
        const mugQty = parseInt(mugInput?.value) || 1;
        const totalQuantity = bucketQty + mugQty;
        
        const bucketTotal = 29.99 * bucketQty;
        const mugTotal = 14.99 * mugQty;
        const subtotal = bucketTotal + mugTotal;
        
        // Get delivery cost
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
        let deliveryCost = 0;
        let deliveryText = 'FREE';
        
        if (selectedDelivery) {
            const deliveryValue = selectedDelivery.value;
            if (deliveryValue === 'express') {
                deliveryCost = 9.99;
                deliveryText = '$9.99';
            } else if (deliveryValue === 'overnight') {
                deliveryCost = 19.99;
                deliveryText = '$19.99';
            }
        }
        
        const tax = subtotal * 0.085;
        const discount = 5.00;
        const total = subtotal + deliveryCost + tax - discount;
        
        // Update summary display
        const summaryRows = document.querySelectorAll('.summary-row');
        if (summaryRows.length >= 4) {
            summaryRows[0].querySelector('span:first-child').textContent = `Items (${totalQuantity})`;
            summaryRows[0].querySelector('span:last-child').textContent = `$${subtotal.toFixed(2)}`;
            
            const deliverySpan = summaryRows[1].querySelector('span:last-child');
            deliverySpan.textContent = deliveryText;
            if (deliveryCost === 0) {
                deliverySpan.className = 'free';
            } else {
                deliverySpan.className = '';
            }
            
            summaryRows[2].querySelector('span:last-child').textContent = `$${tax.toFixed(2)}`;
        }
        
        const totalRow = document.querySelector('.total-row span:last-child');
        if (totalRow) {
            totalRow.textContent = `$${total.toFixed(2)}`;
        }
        const sticky = document.getElementById('stickyTotal');
        if (sticky) sticky.textContent = `$${total.toFixed(2)}`;
    }
    
    // Promo Code with Enhanced Effects
    function initializePromoCode() {
        const promoButton = document.querySelector('.promo-input button');
        const promoInput = document.querySelector('.promo-input input');
        
        if (promoButton && promoInput) {
            promoButton.addEventListener('click', function() {
                applyPromoCode(promoInput.value.trim());
            });
            
            promoInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    applyPromoCode(this.value.trim());
                }
            });
        }
    }
    
    function applyPromoCode(code) {
        const promoButton = document.querySelector('.promo-input button');
        const promoInput = document.querySelector('.promo-input input');
        
        // Add loading state
        promoButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        promoButton.disabled = true;
        
        setTimeout(() => {
            const upperCode = code.toUpperCase();
            
            if (upperCode === 'SAVE10' || upperCode === 'STUDENT' || upperCode === 'VU2025') {
                showPromoSuccess(upperCode);
                promoInput.value = '';
            } else if (code === '') {
                showPromoError('Please enter a promo code');
            } else {
                showPromoError('Invalid promo code. Try SAVE10, STUDENT, or VU2025');
            }
            
            // Reset button
            promoButton.innerHTML = 'Apply';
            promoButton.disabled = false;
        }, 1500);
    }
    
    function showPromoSuccess(code) {
        const modal = createPremiumModal(`
            <div style="text-align: center; padding: 30px;">
                <div style="color: #28a745; font-size: 48px; margin-bottom: 20px;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 style="color: #28a745; margin-bottom: 15px;">Promo Code Applied!</h3>
                <p style="margin-bottom: 20px;">Code "${code}" successfully applied.<br>$10 discount added to your order.</p>
                <button onclick="closeModal()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    Great!
                </button>
            </div>
        `);
        document.body.appendChild(modal);
    }
    
    function showPromoError(message) {
        const modal = createPremiumModal(`
            <div style="text-align: center; padding: 30px;">
                <div style="color: #dc3545; font-size: 48px; margin-bottom: 20px;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 style="color: #dc3545; margin-bottom: 15px;">Invalid Code</h3>
                <p style="margin-bottom: 20px;">${message}</p>
                <button onclick="closeModal()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    OK
                </button>
            </div>
        `);
        document.body.appendChild(modal);
    }
    
    // Form Validation with Premium Effects
    function initializeFormValidation() {
        const inputs = document.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('focus', function() {
                clearFieldError(this);
            });
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value && !validateEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (field.type === 'tel' && value && !validatePhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        let errorDiv = field.parentNode.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            field.parentNode.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
            animation: errorSlide 0.3s ease-out;
        `;
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Enhanced Place Order Button
    function initializePlaceOrderButton() {
        const placeOrderBtn = document.querySelector('.place-order-btn');
        
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', function(e) {
                e.preventDefault();
                processOrder(this);
            });
        }
    }
    
    function processOrder(btn) {
        // Validate all required fields
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showValidationError();
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Start processing
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
        btn.disabled = true;
        btn.style.background = 'linear-gradient(135deg, #95a5a6, #7f8c8d)';
        
        // Show loading overlay
        showLoadingOverlay();
        
        // Simulate processing
        setTimeout(() => {
            hideLoadingOverlay();
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
            showOrderSuccess();
            createConfettiEffect();
        }, 3000);
    }
    
    function showOrderSuccess() {
        const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        
        // Update success modal content
        const orderIdElement = document.getElementById('orderId');
        const estimatedDeliveryElement = document.getElementById('estimatedDelivery');
        
        if (orderIdElement) orderIdElement.textContent = orderNumber;
        if (estimatedDeliveryElement) {
            estimatedDeliveryElement.textContent = deliveryDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }
        
        // Show success modal
        const successModal = document.getElementById('successMessage');
        if (successModal) {
            successModal.classList.remove('hidden');
            successModal.classList.add('show');
        }
    }
    
    // Premium Effects and Animations
    function initializePremiumEffects() {
        // Magnetic effect for buttons
        initializeMagneticEffects();
        
        // Smooth hover animations
        initializeHoverEffects();
        
        // Loading overlay
        createLoadingOverlay();
        
        // Add custom CSS animations
        addCustomAnimations();
    }
    
    function initializeMagneticEffects() {
        document.querySelectorAll('.place-order-btn, .edit-btn, .remove-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }
    
    function initializeHoverEffects() {
        // Enhanced section hover effects
        document.querySelectorAll('.section').forEach(section => {
            section.addEventListener('mouseenter', () => {
                section.style.transform = 'translateY(-5px) rotateX(2deg)';
            });
            
            section.addEventListener('mouseleave', () => {
                section.style.transform = '';
            });
        });
    }
    
    function createLoadingOverlay() {
        if (document.querySelector('.loading-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">Processing your order...</div>
        `;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(52, 73, 94, 0.95));
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s ease;
        `;
        
        document.body.appendChild(overlay);
    }
    
    function showLoadingOverlay() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
        }
    }
    
    function hideLoadingOverlay() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
        }
    }
    
    function createConfettiEffect() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${['#ff9f00', '#ffb333', '#ff6b00'][Math.floor(Math.random() * 3)]};
                    left: ${Math.random() * 100}vw;
                    top: -10px;
                    z-index: 10001;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
    }
    
    // Utility Functions
    function showNotification(message, type = 'info') {
        const colors = {
            info: '#17a2b8',
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107'
        };
        
        const notification = document.createElement('div');
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: notificationSlide 3s ease-out forwards;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    function showValidationError() {
        showNotification('<i class="fas fa-exclamation-triangle"></i> Please fill in all required fields correctly', 'error');
    }
    
    function createPremiumModal(content) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: modalFadeIn 0.3s ease;
            backdrop-filter: blur(5px);
        `;
        
        modal.innerHTML = `
            <div style="
                background: white; 
                border-radius: 12px; 
                max-width: 400px; 
                margin: 20px; 
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            ">
                ${content}
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        return modal;
    }
    
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function validatePhone(phone) {
        return /^[\+]?[\d\s\-\(\)]{10,}$/.test(phone);
    }
    
    function addCustomAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to { transform: scale(2); opacity: 0; }
            }
            
            @keyframes feedbackSlide {
                0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            }
            
            @keyframes notificationSlide {
                0% { opacity: 0; transform: translateX(100%); }
                15% { opacity: 1; transform: translateX(0); }
                85% { opacity: 1; transform: translateX(0); }
                100% { opacity: 0; transform: translateX(100%); }
            }
            
            @keyframes errorSlide {
                0% { opacity: 0; transform: translateY(-10px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes modalSlideUp {
                from {
                    transform: translateY(100px) scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
            }
            
            .loading-spinner {
                width: 60px;
                height: 60px;
                border: 4px solid rgba(255, 159, 0, 0.3);
                border-top: 4px solid #ff9f00;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            }
            
            .loading-text {
                color: #ff9f00;
                font-size: 18px;
                font-weight: 600;
                letter-spacing: 1px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .error {
                border-color: #dc3545 !important;
                box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2) !important;
                animation: fieldShake 0.5s ease-in-out;
            }
            
            @keyframes fieldShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            footer.nextgen-footer.ready .footer-block.visible { transition-delay:.05s; }
        `;
        document.head.appendChild(style);
    }

    /* ================= Enhancement Functions ================= */
    function initFooterReveal(){
        const footer = document.querySelector('footer.nextgen-footer');
        if(!footer || !('IntersectionObserver' in window)) return;
        footer.classList.add('ready');
        const revealEls = footer.querySelectorAll('.footer-brand, .footer-block, .team-card, .compliance .badge, .social-btn');
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
        }, { threshold:.15 });
        revealEls.forEach(el=>io.observe(el));
    }

    function initMetricCounters(){
        const nums = document.querySelectorAll('footer.nextgen-footer .metric-number[data-count]');
        if(!nums.length || !('IntersectionObserver' in window)) return;
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        const io = new IntersectionObserver(entries => {
            entries.forEach(ent => {
                if(ent.isIntersecting){
                    const el = ent.target;
                    const target = parseFloat(el.getAttribute('data-count'));
                    const endsPercent = (el.textContent.trim().endsWith('%'));
                    const duration = 950 + Math.random()*400;
                    const start = performance.now();
                    el.classList.add('animating');
                    function frame(now){
                        const p = Math.min(1,(now-start)/duration);
                        const val = target * easeOut(p);
                        el.textContent = formatValue(val, target, endsPercent);
                        if(p<1) requestAnimationFrame(frame); else el.textContent = formatValue(target, target, endsPercent, true);
                    }
                    requestAnimationFrame(frame);
                    io.unobserve(el);
                }
            });
        }, { threshold:.35 });
        nums.forEach(n=>io.observe(n));
        function formatValue(v, target, percent, final){
            if(percent) return (final? target: v).toFixed(2) + '%';
            if(target >= 1000){
                const val = final? target: v;
                if(val >= 1_000_000) return (val/1_000_000).toFixed(1)+'M';
                return (val/1000).toFixed(1)+'K';
            }
            return (final? target: v).toFixed(target % 1 ? 2 : 0);
        }
    }

    function initStickyTotalSync(){
        const bar = document.querySelector('.sticky-checkout-bar');
        if(!bar) return;
        setTimeout(()=> updateOrderSummary(), 120);
    }

    /* Footer Theme Toggle */
    function initFooterThemeToggle(){
        const footer = document.getElementById('site-footer');
        if(!footer) return; 
        const btn = footer.querySelector('.footer-theme-toggle');
        if(!btn) return;
        // Load saved preference
        const saved = localStorage.getItem('footerTheme');
        // Footer will follow body theme unless explicitly toggled previously
        const bodyTheme = document.body.getAttribute('data-theme') || 'dark';
        if(saved){ footer.setAttribute('data-theme', saved); } else { footer.setAttribute('data-theme', bodyTheme); }
        swapIcon();
        btn.addEventListener('click', ()=>{
            const current = footer.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            footer.setAttribute('data-theme', next);
            localStorage.setItem('footerTheme', next);
            swapIcon();
        });
        function swapIcon(){
            const icon = btn.querySelector('i');
            if(!icon) return;
            if(footer.getAttribute('data-theme') === 'dark'){
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                btn.setAttribute('aria-label','Switch footer to light mode');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                btn.setAttribute('aria-label','Switch footer to dark mode');
            }
        }
    }

    /* Global Theme (Page-wide) */
    function initGlobalTheme(){
        const toggle = document.querySelector('.global-theme-toggle');
        if(!toggle) return;
        const saved = localStorage.getItem('appTheme');
        if(saved){ document.body.setAttribute('data-theme', saved); updateToggleIcon(); syncFooterIfNotCustom(); }
        toggle.addEventListener('click', () => {
            const current = document.body.getAttribute('data-theme') === 'dark' ? 'dark':'light';
            const next = current === 'dark' ? 'light':'dark';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('appTheme', next);
            updateToggleIcon();
            syncFooterIfNotCustom();
        });
        function updateToggleIcon(){
            const icon = toggle.querySelector('i');
            if(!icon) return;
            if(document.body.getAttribute('data-theme') === 'dark'){
                icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
                toggle.setAttribute('aria-label','Toggle light mode');
            } else {
                icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
                toggle.setAttribute('aria-label','Toggle dark mode');
            }
        }
        function syncFooterIfNotCustom(){
            const footer = document.getElementById('site-footer');
            if(!footer) return;
            const custom = localStorage.getItem('footerTheme');
            if(!custom){ footer.setAttribute('data-theme', document.body.getAttribute('data-theme')); }
        }
    }
});

// Global Functions for HTML onclick handlers
function adjustQuantity(change) {
    // Legacy support for HTML onclick handlers
    console.log('Quantity adjustment:', change);
}

function resetForm() {
    // Reset all form fields
    document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]').forEach(input => {
        input.value = '';
        input.classList.remove('error');
    });
    
    // Reset quantities
    document.querySelectorAll('.quantity-control input[type="number"]').forEach(input => {
        input.value = '1';
    });
    
    // Hide success modal
    const successModal = document.getElementById('successMessage');
    if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('show');
    }
    
    // Show reset notification
    const notification = document.createElement('div');
    notification.innerHTML = '<i class="fas fa-refresh"></i> Order form has been reset';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #17a2b8;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: notificationSlide 3s ease-out forwards;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function closeModal() {
    // Close any open modals
    document.querySelectorAll('[style*="z-index: 10001"]').forEach(modal => {
        modal.style.animation = 'modalFadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Hide success message
    const successModal = document.getElementById('successMessage');
    if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('show');
    }
}