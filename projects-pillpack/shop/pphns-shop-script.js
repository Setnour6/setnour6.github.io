document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelectorAll('.navbar ul li a').forEach(item => item.classList.remove('selected'));
        this.classList.add('selected');
        
        const category = this.getAttribute('data-category');
        filterItems(category);
        document.querySelectorAll('.item').forEach(item => {
            if (item.getAttribute('data-category') === category || category === 'all') {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        if (category === 'playermodels' || category === 'all') {
            document.querySelectorAll('.playermodel-section').forEach(label => {
                label.style.display = 'block';
            });
        } else {
            document.querySelectorAll('.playermodel-section').forEach(label => {
                label.style.display = 'none';
            });
        }
    });
});

document.getElementById('category-search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const selectedCategory = document.querySelector('.navbar ul li a.selected').getAttribute('data-category');
    filterItems(selectedCategory, query);
});

document.querySelectorAll('.rarity-filter').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        filterItems();
    });
});

document.querySelectorAll('input[name="price-order"]').forEach(radio => {
    radio.addEventListener('change', function() {
        sortItems();
    });
});

function filterItems(category = null, query = '') {
    const selectedCategory = category || document.querySelector('.navbar ul li a.selected').getAttribute('data-category');
    const selectedRarities = Array.from(document.querySelectorAll('.rarity-filter:checked')).map(cb => cb.value);
    document.querySelectorAll('.item').forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        const itemCategory = item.getAttribute('data-category');
        const itemRarity = item.classList.contains('common') ? 'common' :
                        item.classList.contains('uncommon') ? 'uncommon' :
                        item.classList.contains('rare') ? 'rare' :
                        item.classList.contains('epic') ? 'epic' :
                        item.classList.contains('legendary') ? 'legendary' :
                        item.classList.contains('mythical') ? 'mythical' :
                        item.classList.contains('unobtainable') ? 'unobtainable' : '';

        const matchesCategory = selectedCategory === 'all' || itemCategory === selectedCategory;
        const matchesQuery = itemName.includes(query);
        const matchesRarity = selectedRarities.length === 0 || selectedRarities.includes(itemRarity);

        if (matchesCategory && matchesQuery && matchesRarity) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function sortItems() {
    const order = document.querySelector('input[name="price-order"]:checked').value;
    const items = Array.from(document.querySelectorAll('.item'));
    items.sort((a, b) => {
        const priceA = parseInt(a.querySelector('p:last-of-type').textContent.replace(/\D/g, ''));
        const priceB = parseInt(b.querySelector('p:last-of-type').textContent.replace(/\D/g, ''));
        return order === 'high-to-low' ? priceB - priceA : priceA - priceB;
    });
    const itemGrid = document.querySelector('.item-grid');
    itemGrid.innerHTML = '';
    items.forEach(item => itemGrid.appendChild(item));
}

document.querySelectorAll('.help-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

filterItems();

const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    sidebar.classList.toggle('open');
});
window.addEventListener('orientationchange', function() {
    if (window.orientation === 0 || window.orientation === 180) {
        alert("Please rotate your device to landscape mode for the best experience.");
    }
});
