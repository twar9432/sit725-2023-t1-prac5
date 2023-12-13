// Function to add cards to the page
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.imageUrl}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.name}<i class="material-icons right">more_vert</i></span>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.name}<i class="material-icons right">close</i></span>
                        <p class="card-text">${item.story}</p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
};

// Function to handle form submission
const formSubmitted = () => {
    let formData = {
        name: $('#name').val(),
        story: $('#story').val()
    };
    fetch('https://source.unsplash.com/random/300x200')
        .then(response => {
            formData.imageUrl = response.url;
            postCat(formData);
        })
        .catch(error => console.error('Error fetching image:', error));
};

// Function to POST data to the server
function postCat(cat) {
    fetch('/api/cat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cat)
    })
    .then(response => response.json())
    .then(result => {
        if (result.statusCode === 201) {
            alert('Cat posted');
            location.reload();
        }
    })
    .catch(error => {
        console.error('Error posting cat:', error);
    });
}

// Function to GET all cats and add them to the page
function getAllCats() {
    $.get('/api/cat', (result) => {
        if (result.statusCode === 200) {
            addCards(result.data);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();
    
    // Attach the form submission handler
    $('#storyForm').on('submit', (event) => {
        event.preventDefault();
        formSubmitted();
    });

    // Fetch and display all cats on page load
    getAllCats();
});
