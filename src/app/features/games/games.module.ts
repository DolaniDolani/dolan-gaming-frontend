import { NgModule } from "@angular/core";
import { ListGamesComponent } from "./list-games/list-games.component";
import { CommonModule } from "@angular/common";
import { GamesRoutingModule } from "./games-routing.module";

@NgModule({
    declarations: [ListGamesComponent],
    imports: [CommonModule, GamesRoutingModule],
})
export class GamesModule {}