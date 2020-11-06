# fixedTableHead
Easy fixed header plugin for big tables.

Sets the tablehead fixed once the navigation reaches it.
In case you run into a race condition eg.
Some ajax is loading after document ready (ajax_get_prices_detail)
and will temper with the tableOffsetTop before reaching
the table, you must use a different initialization.

1. Identify the asynchron call
2. Trigger a window event eg.:($(window).trigger('refresh-table-head');)
3. Listen to the window event

    jQuery(window).on({
      'refresh-table-head': function() {
        jQuery('#DetailTable').fixedTableHead({
          offsetTop: 51 // Offset from top to header.
        });
      }
    });
 
 Copyright © 2020 Kim Mayr <mayr@itb-swiss.ch>
