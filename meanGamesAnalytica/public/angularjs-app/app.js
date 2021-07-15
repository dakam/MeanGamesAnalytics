angular.module("meanGames", ['ngRoute', 'angular-jwt']).config(config);

function config($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");

    $routeProvider.when("/", {
        templateUrl:"angularjs-app/welcome/welcome.html",
        access: {restricted: false}
    }).when("/games", {

        templateUrl:"angularjs-app/gamesList/games.html",
        controller:"gamesController",
        controllerAs:"vm",
        access: {restricted: false}
    }).when("/games/:id", {
        templateUrl:"angularjs-app/singleGame/singlegame.html",
        controller:"singleGameController",
        controllerAs:"vm",
        access: {restricted: false}

    }).when("/register", {
        templateUrl:"angularjs-app/register/register.html",
        controller:"RegisterController",
        controllerAs:"vm",
        access: {restricted: false}
    }).when("/profile", {
        templateUrl:"angularjs-app/profile/profile.html",
        access: {restricted: true}
    }).otherwise({
        redirectTo: "/"
    })

}

function run($rootScope,  $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if(nextRoute.access !== undefined && 
            nextRoute.access.restricted && 
            !AuthFactory.auth && !$window.sessionStorage.token) { 
            event.preventDefault();
            $location.path("/");
        }
    })
}