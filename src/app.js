export class App {

  configureRouter(config, router) {
      config.title = 'Tweeter';

      config.map([
          {
              route: ['', 'home'],
              name: 'home',
              moduleId: './home',
              title: 'Home',
              nav: true
          },
      ]);

      this.router = router;
  }

}
