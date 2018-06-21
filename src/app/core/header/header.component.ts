import {Component} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Response} from '@angular/http';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  onLogout() {
    this.authService.logout();
  }
  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response.json());
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
