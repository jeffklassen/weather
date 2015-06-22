weather.directive("confirmButton", function ($document, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var buttonId, html, message, nope, title, yep;

            buttonId = Math.floor(Math.random() * 10000000000);

            attrs.buttonId = buttonId;

            message = attrs.message || "Are you sure?";
            yep = attrs.yes || "Yes";
            nope = attrs.no || "No";
            title = attrs.title || "Confirm";

            html = "<div id=\"button-" + buttonId + "\">\n  <span class=\"confirmbutton-msg\">" + message + "</span><br>\n	<button class=\"confirmbutton-yes btn btn-danger\">" + yep + "</button>\n	<button class=\"confirmbutton-no btn\">" + nope + "</button>\n</div>";

            element.popover({
                content: html,
                html: true,
                trigger: "manual",
                title: title,
                placement: 'left'
            });

            return element.bind('click', function (e) {
                var dontBubble, pop;
                dontBubble = true;

                e.stopPropagation();

                element.popover('show');

                pop = $("#button-" + buttonId);

                pop.closest(".popover").click(function (e) {
                    if (dontBubble) {
                        e.stopPropagation();
                    }
                });

                pop.find('.confirmbutton-yes').click(function (e) {
                    dontBubble = false;

                    var func = $parse(attrs.confirmButton);
                    func(scope);
                });

                pop.find('.confirmbutton-no').click(function (e) {
                    dontBubble = false;

                    $document.off('click.confirmbutton.' + buttonId);

                    element.popover('hide');
                });

                $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function () {
                    $document.off('click.confirmbutton.' + buttonId);
                    element.popover('hide');
                });
            });
        }
    };
});