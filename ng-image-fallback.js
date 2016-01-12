(function () {
    'use strict';
    angular
        .module('ng-image-fallback',[])
        .directive('imageFallback', imageFallback);
    imageFallback.$inject = ['$rootScope', '$timeout'];
    /* @ngInject */
    function imageFallback($rootScope, $timeout) {
        var directive = {
            link: link
        };
        return directive;

        function link(scope, element, attrs, controller) {
            $(element).attr('src', attrs.loadingImage)
            attrs.$observe('ngSrc', function () {
                $timeout(function () {
                    if (angular.isDefined(attrs.ngSrc)) {
                        if (attrs.ngSrc.length > 0) {
                            $(element).attr('src', attrs.loadingImage)
                            var img = new Image();
                            img.src = attrs.ngSrc;
                            $(img).imagesLoaded()
                                .always(function (instance) {

                                })
                                .done(function (instance,image) {
                                    $(element).attr('src',attrs.ngSrc);
                                scope.$apply();
                                })
                                .fail(function () {
                                    console.log('error')
                                        $(element).attr('src', attrs.errorImage)
                                })
                                .progress(function (instance, image) {
                                    var result = image.isLoaded ? 'loaded' : 'broken';
                                    console.log('image is ' + result + ' for ' + image.img.src);
                                $(element).attr('src', attrs.loadingImage);
                                });
                        }
                    }else{
                        $timeout(function () {
                        console.log(attrs)
                        $(element).attr('src', attrs.errorImage)
                        },100);
                    }
                })
            })

        }
    }

})();
