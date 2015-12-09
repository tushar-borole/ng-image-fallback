(function () {
    'use strict';
    angular
        .module('angular-image-fallback',[])
        .directive('imageLoading', imageLoading);
    imageLoading.$inject = ['$rootScope', '$timeout'];
    /* @ngInject */
    function imageLoading($rootScope, $timeout) {
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
                            //$(element).attr('src', attrs.loadingImage)
                            var img = new Image();
                            img.src = attrs.ngSrc;
                            $(img).imagesLoaded()
                                .always(function (instance) {

                                })
                                .done(function (instance,image) {
                                    $(element).attr('src',image.img.src)
                                })
                                .fail(function () {
                                    console.log('error')
                                        $(element).attr('src', attrs.errorImage)
                                })
                                .progress(function (instance, image) {
                                    var result = image.isLoaded ? 'loaded' : 'broken';
                                    console.log('image is ' + result + ' for ' + image.img.src);
                                });
                        }
                    }
                })
            })

        }
    }

})();
