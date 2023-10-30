import React from 'react';

const Swiper = (eleId, callback) => {

    const isSwipeable = (e, eleId) => {
        return Boolean(e.target.closest(`#${eleId}`)) || e.target.getAttribute('id') === eleId;
    };

    var element = document.getElementById(eleId);

    var swipedir;
    var dist;
    var mouseOrigin;
    var isSwiping = false;
    var isMouseDown = false;
    var mouseRelease;
    var currentTask;
    var swipeMargin = 0;
    var handleswipe = callback || function (swipedir, dist, isMouseDown) { };

    if (element) {
        //computer
        element.addEventListener('mousedown', startSwipe);
        document.addEventListener('mouseup', endSwipe);
        document.addEventListener('mousemove', detectMouse);
        //mobile phones
        element.addEventListener('touchstart', startSwipe);
        document.addEventListener('touchend', endSwipe);
        document.addEventListener('touchmove', detectMouse);

        //STARTSWIPE
        function startSwipe(evt) {
            evt.stopPropagation();
            if (isSwipeable(evt, eleId)) {
                mouseOrigin = evt.screenX || evt.changedTouches[0].screenX;
                isSwiping = true;
                isMouseDown = true;
            }
            document.addEventListener('mouseup', endSwipe);
        }

        //ENDSWIPE
        function endSwipe(evt) {
            mouseOrigin = null;
            isSwiping = false;
            isMouseDown = false;
            element.style.left = 0;
            if (dist > 0) {
                handleswipe(swipedir, dist, false);//update callback fn with recent variables
            }
            setTimeout(() => {
                dist = 0;
                document.removeEventListener('mouseup', endSwipe);
            }, 100);
        }

        //DETECTMOUSE
        function detectMouse(evt) {
            if (isMouseDown) {
                document.addEventListener('mouseup', endSwipe);
                var currentMousePosition = evt.screenX || evt.changedTouches[0].screenX;
                var swipeDifference = Math.abs(mouseOrigin - currentMousePosition);

                if (isSwiping && element && (swipeDifference > swipeMargin)) {
                    if ((swipeDifference - swipeMargin) <= swipeMargin) {
                        //no change, allows user to take no action
                        element.style.left = 0;
                    }
                    else if (mouseOrigin > currentMousePosition) {
                        //swipe left
                        element.style.left = -swipeDifference + "px";
                        dist = swipeDifference;
                        swipedir = "left";
                    }
                    else if ((mouseOrigin < currentMousePosition)) {
                        //swip right");
                        element.style.left = swipeDifference + "px";
                        dist = swipeDifference;
                        swipedir = "right";
                    }
                }
                evt.preventDefault();
                handleswipe(swipedir, dist, isMouseDown);
            }
        }
    }
};

export default Swiper;
