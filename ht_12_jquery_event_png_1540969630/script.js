let isSlideClose = true;

function clickSlider()
{
    if (isSlideClose)
    {
        $('#verticalBarId').show();
        $('#modalOpen').show();
        
        $('#triangleCh').removeClass('triangle-right').addClass('triangle-left');
    }
    else
    {
        $('#verticalBarId').hide();
        $('#modalOpen').hide();
        
        $('#triangleCh').removeClass('triangle-left').addClass('triangle-right');
    }

    isSlideClose = !isSlideClose;
}

$(document).ready( function()
{
    for (let i = 0; i < 4; ++i)
    {
        let button = $('<button></button>');
        button.text(`Page ${i + 1}`);
        button.attr('id', `Page ${i + 1}`);
        button.click(pageChanger);
        // button.addClass('modalClass');
        button.css(
        {
            'margin': '10px',
            'height': '30px',
            'width': '70px'
        });

        $('#buttonContainerId').append(button);
    }

    // $('#Page 1').css('background-color', 'red');
    $('#pageHeader').text('Content of Page 1');
    $('#pageContent').text('Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 ');

});

let lastId;

function pageChanger()
{
    if (lastId == event.target.id)
        return;

    console.log(event.target.id);

    switch(event.target.id)
    {
        case 'Page 1':
            $('#pageHeader').text('Content of Page 1');
            $('#pageContent').text('Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 Content of Page 1 ');
            break;
        case 'Page 2':
            $('#pageHeader').text('Content of Page 2');
            $('#pageContent').text('Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 Content of Page 2 ');
            break;
        case 'Page 3':
            $('#pageHeader').text('Content of Page 3');
            $('#pageContent').text('Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 Content of Page 3 ');
            break;
        case 'Page 4':
            $('#pageHeader').text('Content of Page 4');
            $('#pageContent').text('Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4 Content of Page 4');
            break;
    }   

    lastId = event.target.id;
}

function openModal()
{
    $('#modalW').show();
}

function closeModalWindow()
{
    $('#modalW').hide();
}

function resizeDiv()
{
    console.log(event);
}

$('#resizeDiv').keydown(resizeDiv).drag(resizeDiv);