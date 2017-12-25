function Card(id, name) {
      var self = this;
  
      this.id = id;
      this.name = name;
      this.$element = createCard();
  
      function createCard() {
          // CREATING THE BLOCKS
          var $card = $('<li>').addClass('card');
          var $cardDescription = $('<p>').addClass('card-description').text(self.name);
          var $cardDelete = $('<button>').addClass('btn-delete').text('X');

          // BINDING TO CLICK EVENT
          $cardDelete.click(function(){
                    self.removeCard();
          });

          // COMBINING BLOCKS AND RETURNING THE CARD
          $card.append($cardDescription).append($cardDelete);
            return $card;
        }
      }
   
  Card.prototype = {
        removeCard: function() {
        var self = this;
        $.ajax({
          url: baseUrl + '/card/' + self.id,
          method: 'DELETE',
          success: function(){
            self.$element.remove();
          }
        });
      }
    }

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  } 