/* 
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

// document.addEventListener('DOMContentLoaded', () => {
//     /* DO SOMETHING */
//   });


document.addEventListener('DOMContentLoaded', function () {
  populatePlacesList();
  populatePlaceDetails();
  populateReviews();

  // Event listener for review form submission
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
    detailsUrl: 'place.html',
    id: 1
  },
  {
    name: 'Cozy Cabin',
    price: 100,
    location: 'Toronto, Canada',
    imageUrl: 'place2.jpg',
    detailsUrl: 'place.html',
    id: 2
  },
  {
    name: 'Modern Apartment',
    price: 200,
    location: 'New York, United States',
    imageUrl: 'place3.jpg',
    detailsUrl: 'place.html',
    id: 3
  }
];

function populatePlacesList() {
  const placesList = document.getElementById('places-list');

  const placeCards = document.querySelector('.places-list')
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

function populatePlaceDetails() {
  const placeDetails = document.getElementById('place-details');
  const place = [
    {
      name: 'Beautiful Beach House',
      host: 'John Doe',
      price: 150,
      location: 'Los Angeles, United States',
      description: 'A beautiful beach house with amazing views...',
      amenities: 'WiFi, Pool, Air Conditioning',
      imageUrl: 'place1.jpg',
      id: 1
    },
    {
      name: 'Cozy Cabin',
      host: 'John',
      price: 100,
      location: 'Toronto, Canada',
      description: 'A beautiful Cozy Cabin with amazing views...',
      amenities: 'WiFi, test, Air Conditioning',
      imageUrl: 'place1.jpg',
      id: 2
    },
    {
      name: 'Modern Apartment',
      host: 'John Doe',
      price: 200,
      location: 'New York, United States',
      description: 'Beautiful Modern Apartment...',
      amenities: 'WiFi, Air Conditioning',
      imageUrl: 'place1.jpg',
      id: 3
    }
  ];

  const data = places.map(p => {
    console.log(p.id, "tets");
    place.map(i => {
      if (p.id === i.id) {
        return `
        <h1>${i.name}</h1>
        <div class="place-details">
            <div class="place-info">
                <p><strong>Host:</strong>${i.host}</p>
                <p><strong>Price per night:</strong> $${i.price}</p>
                <p><strong>Location:</strong>${i.location}</p>
                <p><strong>Description:</strong> A beautiful beach house with amazing views...</p>
                <p><strong>Amenities:</strong> WiFi, Pool, Air Conditioning</p>
            </div>
        </div>`
      }
    })
  });
  placeDetails.innerHTML += data.join('')


  // if (placeDetails) {
  //   placeDetails.innerHTML = `
  //         <h1>${place.name}</h1>
  //         <div class="place-details">
  //             <img src="${place.imageUrl}" alt="Place Image" class="place-image-large">
  //             <div class="place-info">
  //                 <p><strong>Host:</strong> ${place.host}</p>
  //                 <p><strong>Price per night:</strong> $${place.price}</p>
  //                 <p><strong>Location:</strong> ${place.location}</p>
  //                 <p><strong>Description:</strong> ${place.description}</p>
  //                 <p><strong>Amenities:</strong> ${place.amenities}</p>
  //             </div>
  //         </div>
  //     `;
  // }
}

function populateReviews() {
  const reviewsSection = document.getElementById('reviews');
  const reviews = [
    {
      name: 'Jane Smith',
      text: 'Great place to stay!',
      rating: 4
    },
    {
      name: 'Robert Brown',
      text: 'Amazing location and very comfortable.',
      rating: 5
    }
    // Add more reviews as needed
  ];

  if (reviewsSection) {
    reviews.forEach(review => {
      const reviewCard = document.createElement('div');
      reviewCard.classList.add('review-card');

      reviewCard.innerHTML = `
              <p><strong>${review.name}:</strong></p>
              <p>${review.text}</p>
              <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
          `;

      reviewsSection.appendChild(reviewCard);
    });
  }
}

