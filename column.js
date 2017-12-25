 function Column(id, name) {
    var self = this;

    this.id = id;
	this.name = name || 'No name given';
    this.$element = createColumn();

    function createColumn() {
      // CREATING COMPONENTS OF COLUMNS
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-column').text('X');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
      let $columnInput = $('<input type="text" placeholder="not empty">');

      // ADDING EVENTS
      $columnDelete.click(function() {
          self.removeColumn();
      });
      
      $columnAddCard.click(function(event) {
          if ($columnInput.val() == '') {
            return;
          } else {
            var cardName = $columnInput.val()
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                name: cardName,
                bootcamp_kanban_column_id: self.id
                },
                success: function(response) {
                    var card = new Card(response.id, cardName);
                    self.$element.children('ul').append(card.$element)
                  //  self.createCard(new Card(cardName));
                }
            });  
            $columnInput.val('');
          }

      });
  
      // CONSTRUCTION COLUMN ELEMENT
      $column.append($columnTitle)
          .append($columnCardList)
          .append($columnInput)
          .append($columnAddCard)
          .append($columnDelete);
  
      // RETURN OF CREATED COLUMN
      return $column;
     
    }
  }  

  Column.prototype = {
    createCard: function(card) {
      this.$element.children('ul').append(card.$element);
    }, 
    removeColumn: function() {
        var self = this;
        $.ajax({
          url: baseUrl + '/column/' + self.id,
          method: 'DELETE',
          success: function(response){
            self.$element.remove();
          }
        });
     }
  };