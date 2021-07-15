angular.module("meanGames").directive("gamesNavigation", GamesNavigation);

function GamesNavigation() {
    return {
        restrict: "E",
        templateUrl: "angularjs-app/navigation-directive/navigation-directive.html"
    }
}