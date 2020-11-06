/*!
 * fixedTableHead.js
 * Easy fixed header plugin for big tables.
 * 
 * Sets the tablehead fixed once the navigation reaches it.
 * In case you run into a race condition eg.
 * Some ajax is loading after document ready (ajax_get_prices_detail)
 * and will temper with the tableOffsetTop before reaching
 * the table, you must use a different initialization.
 * 
 *      1. Identify the asynchron call
 *      2. Trigger a window event eg.:($(window).trigger('refresh-table-head');)
 *      3. Listen to the window event
 * 
 *          jQuery(window).on({
 *             'refresh-table-head': function() {
 *                  jQuery('#DetailTable').fixedTableHead({
 *                      offsetTop: 51 // Offset from top to header.
 *                  });
 *              }
 *          });
 * 
 * Copyright © 2020 Kim Mayr <mayr@itb-swiss.ch>
 */
jQuery.fn.fixedTableHead = function(options) {
    const headerOffsetHeight = options.offsetTop || 0;
    const headerWidth = this.width();
    const headerOffsetLeft = this.offset().left;
    const theadOriginal = jQuery(this).find('thead:first-child');

    let self = this;
    let tableOffsetTop = jQuery(this).offset().top;
    let windowOffsetTop = 0;
    let thead = theadOriginal.clone();
    let cells = thead.find('th');
    
    // Set widths from original tablehead cells,
    // so the cloned tablehead cells remain the same size
    // as the original one.
    theadOriginal.find('th').each(function(i) {
        jQuery(cells.get(i)).css({
            width: jQuery(this).outerWidth(),
            visibility: 'visible'
        });
    });

    thead.css({
        position: 'fixed',
        left: headerOffsetLeft,
        top: headerOffsetHeight,
        width: headerWidth,
        display: 'none'
    });

    jQuery('body').append(thead);

    jQuery(window).scroll(function(event) {
        windowOffsetTop = jQuery(this).scrollTop() + headerOffsetHeight;
                
        if (windowOffsetTop > tableOffsetTop) {
            thead.css('display', 'block');
        } else {
            thead.css('display', 'none');
        }

        event.stopPropagation();
    });
}