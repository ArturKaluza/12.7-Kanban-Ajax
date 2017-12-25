 var root = {
    name: 'root',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#root')
  };

  $('#create-board').click(function() {
        var columnName = prompt('Enter a column name');
        $.ajax({
    		url: baseUrl + '/column',
    		method: 'POST',
    		data: {
            	name: columnName
    		},
    		success: function(response){
    			var column = new Column(response.id, columnName);
    			root.addColumn(column);
          	}
        });
});