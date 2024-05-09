import { House } from "./house";

export class Console {
    private house : House;

    public constructor() {
        this.house = new House();
    }

    public addMilitary(type: string, cnt: number) : string | null {
        if (this.house.getMilitary().getTotalCnt() + cnt > 1000) return "Too many soldiers!";
        if (this.house.getElixir().getHave() < cnt * 100) return "Too little Elixir!";
        this.house.getElixir().useHave(cnt * 100);
        this.house.getMilitary().buy(type, cnt);
        return null;
    }

    public handleOrder(order: string): string | null {
        if (order == "") return "Something's wrong with the input"
        let arr = order.split(" ");
        if (arr[0] === "Build") {
            if (arr.length < 2) return "Not enough arguments"
            let checkBuilt = this.house.checkBuilt(arr[1]);
            if (checkBuilt != null) return checkBuilt;
            let res = this.house.updateStorage(arr[1]);
            if (res != null) {
                return res;
            }
            return null;
        } else if (arr[0] == "Upgrade") {
            if (arr.length < 2) return "Not enough arguments"
            let res = this.house.updateStorage(arr[1]);
            if (res != null) {
                return res;
            }
            return null;
        } else if (arr[0] == "Train") {
            if (arr.length < 3) return "Not enough arguments"
            let cnt: number = +arr[2];
            this.addMilitary(arr[1], cnt);
            return null;
        }
        return "I don't understand what you're saying."
    }

    public getHouse(): House { return this.house; }
}