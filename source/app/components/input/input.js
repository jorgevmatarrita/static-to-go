import jQuery from 'jquery';

jQuery(() => {

    console.log(12312312);

    const inputs = jQuery('.inputComponent').each( (index, el) => {

        console.log(el);

        const $container = jQuery(el),
              $input = $container.find('input'),
              $button = $container.find('button');

        $button.on('click', () => {
             $input.val('Hello!!!');
        })

    });

});