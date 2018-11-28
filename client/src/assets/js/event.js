
(function() {
  var placesAutocomplete = places({
    container: document.querySelector('#address')
  });

  var $address = document.querySelector('#address-value')
  placesAutocomplete.on('change', function(e) {
    $address.textContent = e.suggestion.value 
  });

  placesAutocomplete.on('clear', function() {
    $address.textContent = 'none';
  });

})();
