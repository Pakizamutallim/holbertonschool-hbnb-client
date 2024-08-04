document.addEventListener('DOMContentLoaded', function () {
  populatePlacesList();
  checkAuthentication();

  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addReview();
    });
  }
});

const places = [
  {
    name: 'Beautiful Beach House',
    price: 150,
    location: 'Los Angeles, United States',
    imageUrl: 'place1.jpg',
    detailsUrl: 'place.html?id=1',
    id: 1
  },
  {
    name: 'Cozy Cabin',
    price: 100,
    location: 'Toronto, Canada',
    imageUrl: 'place2.jpg',
    detailsUrl: 'place.html?id=2',
    id: 2
  },
  {
    name: 'Modern Apartment',
    price: 200,
    location: 'New York, United States',
    imageUrl: 'place3.jpg',
    detailsUrl: 'place.html?id=3',
    id: 3
  }
];

function populatePlacesList() {
  const placeCards = document.querySelector('.places-list');
  
  places.forEach(place => {
    placeCards.classList.add('place-card');
    
    placeCards.innerHTML += `
      <div class="card">
          <h2>${place.name}</h2>
          <p>price per night: $<span>${place.price}</span></p>
          <p>Location: <span>${place.location}</span></p>
          <a href="${place.detailsUrl}" id="${place.id}" class="details-button">View Details</a>
      </div>`;
  });
}

function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function fetchPlaceDetails(token, placeId) {
  try {
    const response = await fetch(`https://your-actual-api-url/places/${placeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const place = await response.json();
      displayPlaceDetails(place);
    } else {
      console.error('Failed to fetch place details:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

function displayPlaceDetails(place) {
  const placeDetails = document.getElementById('place-details');
  if (placeDetails) {
    placeDetails.innerHTML = `
      <h1>${place.name}</h1>
      <div class="place-details">
          <div class="place-info">
              <p><strong>Host:</strong> ${place.host}</p>
              <p><strong>Price per night:</strong> $${place.price}</p>
              <p><strong>Location:</strong> ${place.location}</p>
              <p><strong>Description:</strong> ${place.description}</p>
              <p><strong>Amenities:</strong> ${place.amenities}</p>
          </div>
          <div class="place-images">
              ${place.images.map(image => `<img src="${image}" alt="${place.name}">`).join('')}
          </div>
      </div>`;
  }
}

function populateReviews() {
  const reviewsSection = document.getElementById('reviews');
  if (reviewsSection) {
    reviewsSection.innerHTML = `
      <div class="review-card">
          <p><strong>Jane Smith:</strong></p>
          <p>Great place to stay!</p>
          <p>Rating: ★★★★☆</p>
      </div>
      <div class="review-card">
          <p><strong>Robert Brown:</strong></p>
          <p>Amazing location and very comfortable.</p>
          <p>Rating: ★★★★★</p>
      </div>`;
  }
}

function checkAuthentication() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');

  if (!token) {
      loginLink.style.display = 'block';
  } else {
      loginLink.style.display = 'none';
      const placeId = getPlaceIdFromURL();
      if (placeId) {
        fetchPlaceDetails(token, placeId);
      }
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

async function addReview() {
  const token = getCookie('token');
  const placeId = getPlaceIdFromURL();
  const reviewText = document.getElementById('review').value;
  const rating = document.getElementById('rating').value;

  try {
    const response = await fetch(`https://your-actual-api-url/places/${placeId}/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ review: reviewText, rating: parseInt(rating) })
    });

    if (response.ok) {
      alert('Review submitted successfully!');
      document.getElementById('review-form').reset();
      populateReviews();
    } else {
      alert('Failed to submit review');
    }
  } catch (error) {
    alert('An error occurred: ' + error.message);
  }
}

// Login page script
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const response = await loginUser(email, password);
        if (response.ok) {
          const data = await response.json();
          document.cookie = `token=${data.access_token}; path=/`;
          window.location.href = 'index.html';
        } else {
          alert('Login failed: ' + response.statusText);
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    });
  }
});

async function loginUser(email, password) {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  return response;
}

document.addEventListener('DOMContentLoaded', () => {
  checkAuthentication();

  const countryFilter = document.getElementById('country-filter');
  countryFilter.addEventListener('change', () => {
    filterPlacesByCountry();
  });
});

async function fetchPlaces(token) {
  try {
    const response = await fetch('https://your-actual-api-url/places', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const places = await response.json();
      displayPlaces(places);
    } else {
      console.error('Failed to fetch places:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

function displayPlaces(places) {
  const placesList = document.getElementById('places-list');
  placesList.innerHTML = '';

  places.forEach(place => {
    const placeElement = document.createElement('div');
    placeElement.classList.add('place-card');
    placeElement.innerHTML = `
      <h2>${place.name}</h2>
      <p>Price per night: $<span>${place.price}</span></p>
      <p>Location: <span>${place.location}</span></p>
      <a href="${place.detailsUrl}" class="details-button">View Details</a>
    `;
    placeElement.dataset.country = place.location.split(', ')[1];
    placesList.appendChild(placeElement);
  });
}

function filterPlacesByCountry() {
  const selectedCountry = document.getElementById('country-filter').value;
  const placeCards = document.querySelectorAll('.place-card');

  placeCards.forEach(card => {
    if (selectedCountry === 'all' || card.dataset.country === selectedCountry) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
