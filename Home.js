// ============================================
// PRODUCTS DATA (Easy to update)
// ============================================
const productsArray = [
  {
    id: 1,
    name: "Oversized Denim Jacket",
    price: "$59.90",
    description: "Classic relaxed fit denim jacket with vintage wash. Perfect layering piece for any casual outfit. Made from 100% organic cotton for sustainable style.",
    image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600",
    video: null,
    size: "M",
    color: "Denim Blue"
  },
  {
    id: 2,
    name: "Sleek Leather Sneakers",
    price: "$89.00",
    description: "Minimalist white leather sneakers with memory foam insole. Everyday luxury comfort with premium materials and durable rubber sole.",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
    video: null,
    size: "42",
    color: "White"
  },
  {
    id: 3,
    name: "Silk Satin Midi Dress",
    price: "$79.99",
    description: "Elegant cowl neck satin dress, perfect for parties or evening dates. Flowy and breathable with a flattering silhouette that suits all body types.",
    image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=600",
    video: null,
    size: "S",
    color: "Champagne"
  },
  {
    id: 4,
    name: "Retro Runner Shoes",
    price: "$74.50",
    description: "Chunky retro style sneakers with breathable mesh. Sporty and trendy statement piece with cushioned sole for all-day comfort.",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
    video: null,
    size: "41",
    color: "Gray"
  },
  {
    id: 5,
    name: "Cotton Relaxed Trousers",
    price: "$49.90",
    description: "High-waisted wide leg trousers in soft organic cotton. Dress up or down effortlessly with this versatile wardrobe essential.",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600",
    video: null,
    size: "L",
    color: "Beige"
  },
  {
    id: 6,
    name: "Cropped Wool Blazer",
    price: "$109.00",
    description: "Tailored cropped blazer with structured shoulders. Sophisticated modern edge perfect for office wear or smart casual occasions.",
    image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=600",
    video: null,
    size: "M",
    color: "Charcoal"
  }
];

// ============================================
// CONFIGURATION (Update these with your actual details)
// ============================================
// WhatsApp number in international format (without '+' or spaces)
const WHATSAPP_NUMBER = "254712345678"; // Replace with your actual number

// Google Form Configuration
// IMPORTANT: Replace with your actual Google Form URL and entry field ID
// Example: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=pp_url&entry.FIELD_ID={PRODUCT_NAME}"
const GOOGLE_FORM_PREFILL_TEMPLATE = "https://docs.google.com/forms/d/e/1FAIpQLSf2foE4rM7QVKM0q64Uf8s1n17qmizsUczhkPG9knoK8bWc7g/viewform";

// ============================================
// HELPER FUNCTIONS
// ============================================

// Build Google Form link with product name prefill
function getGoogleFormLink(productName) {
  if (GOOGLE_FORM_PREFILL_TEMPLATE.includes("{PRODUCT_NAME}")) {
    return GOOGLE_FORM_PREFILL_TEMPLATE.replace("{PRODUCT_NAME}", encodeURIComponent(productName));
  }
  // Fallback: return base URL with product parameter
  return GOOGLE_FORM_PREFILL_TEMPLATE + "?product=" + encodeURIComponent(productName);
}

// Build WhatsApp link with product name prefill
function getWhatsAppLink(productName) {
  const text = `I want to order ${productName} from Urban Vogue. Please help me with payment and delivery details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ============================================
// DOM ELEMENTS
// ============================================
const productsGrid = document.getElementById('productsGrid');
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalDesc = document.getElementById('modalDesc');
const modalPriceElem = document.getElementById('modalPrice');
const modalSizeElem = document.getElementById('modalSize');
const modalColorElem = document.getElementById('modalColor');
const modalOrderBtn = document.getElementById('modalOrderBtn');
const closeModalSpan = document.querySelector('.close-modal');
const shopNowBtn = document.getElementById('shopNowBtn');

let currentProduct = null;

// ============================================
// RENDER PRODUCTS DYNAMICALLY
// ============================================
function renderProducts() {
  productsGrid.innerHTML = '';
  
  productsArray.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    
    // Product image
    const mediaElem = document.createElement('img');
    mediaElem.classList.add('product-media');
    mediaElem.src = product.image;
    mediaElem.alt = product.name;
    mediaElem.loading = 'lazy';
    
    // Product info container
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('product-info');
    
    // Product name
    const nameElem = document.createElement('h3');
    nameElem.classList.add('product-name');
    nameElem.textContent = product.name;
    
    // Product price
    const priceElem = document.createElement('div');
    priceElem.classList.add('product-price');
    priceElem.textContent = product.price;

    // Product meta (new fields)
    const metaElem = document.createElement('div');
    metaElem.classList.add('product-meta');
    metaElem.innerHTML = `Size: <strong>${product.size || 'N/A'}</strong> • Color: <strong>${product.color || 'N/A'}</strong>`;
    
    // Order button
    const orderBtn = document.createElement('button');
    orderBtn.classList.add('order-btn-card');
    orderBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Order Now';
    
    // Order button click - opens Google Form with prefill
    orderBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const formLink = getGoogleFormLink(product.name);
      window.open(formLink, '_blank');
    });
    
    // Card click - opens modal
    card.addEventListener('click', () => {
      openModal(product);
    });
    
    // Assemble card
    infoDiv.appendChild(nameElem);
    infoDiv.appendChild(priceElem);
    infoDiv.appendChild(metaElem);
    infoDiv.appendChild(orderBtn);
    card.appendChild(mediaElem);
    card.appendChild(infoDiv);
    productsGrid.appendChild(card);
  });
}

// ============================================
// MODAL FUNCTIONS
// ============================================

// Open modal with product details
function openModal(product) {
  currentProduct = product;
  
  // Set modal image
  modalImage.src = product.image;
  modalImage.alt = product.name;
  
  // Set modal content
  modalName.textContent = product.name;
  modalDesc.textContent = product.description;
  modalPriceElem.textContent = product.price;
  if (modalSizeElem) modalSizeElem.textContent = `Size: ${product.size || 'N/A'}`;
  if (modalColorElem) modalColorElem.textContent = `Color: ${product.color || 'N/A'}`;
  
  // Set Google Form order button
  modalOrderBtn.onclick = (e) => {
    e.preventDefault();
    const formLink = getGoogleFormLink(product.name);
    window.open(formLink, '_blank');
  };
  
  // Ensure WhatsApp button exists and is interactive
  let waBtn = document.getElementById('modalWhatsAppBtn');
  if (!waBtn) {
    const modalDetails = document.querySelector('.modal-details');
    waBtn = document.createElement('button');
    waBtn.id = 'modalWhatsAppBtn';
    waBtn.type = 'button';
    waBtn.className = 'modal-wa-btn';
    waBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Order via WhatsApp';
    modalDetails.appendChild(waBtn);
  }
  
  // Bind click handler
  waBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const waLink = getWhatsAppLink(product.name);
    window.open(waLink, '_blank');
  };
  
  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// ============================================
// FOOTER INTERACTIONS
// ============================================
function setupFooterInteractions() {
  // WhatsApp footer button
  const whatsappFooterBtn = document.getElementById('whatsappFooterBtn');
  if (whatsappFooterBtn) {
    whatsappFooterBtn.href = `https://wa.me/+254111341988?text=${encodeURIComponent("Hi! I'm interested in shopping at Urban Vogue. Please share your catalog and ordering information.")}`;
    whatsappFooterBtn.target = '_blank';
  }
  
  // Google Form footer link
  const googleFormFooter = document.getElementById('googleFormFooterLink');
  if (googleFormFooter) {
    const genericLink = GOOGLE_FORM_PREFILL_TEMPLATE.includes("{PRODUCT_NAME}") 
      ? GOOGLE_FORM_PREFILL_TEMPLATE.replace("{PRODUCT_NAME}", "General Order Inquiry")
      : GOOGLE_FORM_PREFILL_TEMPLATE;
    googleFormFooter.href = genericLink;
    googleFormFooter.target = '_blank';
  }
}

// ============================================
// SMOOTH SCROLL FUNCTION
// ============================================
function scrollToProducts() {
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}

// ============================================
// EVENT LISTENERS
// ============================================
shopNowBtn.addEventListener('click', scrollToProducts);
closeModalSpan.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

// ============================================
// INITIALIZATION
// ============================================
renderProducts();
setupFooterInteractions();