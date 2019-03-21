class Subject {
    constructor() {
        this.handlers = [];
    }

    subscribe(fn) {
        this.handlers.push(fn);
    }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    publish(msg, someObj) {
        var scope = someObj || window;
        for (let fn of this.handlers) {
            fn(scope, msg);
        }
    }
}

class WeatherOfPlace extends Subject{
    constructor(location, description, icon, temp, high, low, humidity, sr, ss){
        super();
        this._location = location;
        this._description = description;
        this._low = low;
        this._icon = icon;
        this._temp=temp;
        this._high=high;
        this._humidity=humidity;
        this._sr=sr;
        this._ss=ss;
    }

    get location() {
        return this._location;
    }

    get description() {
        return this._description;
    }

    get low() {
        return this._low;
    }

    get icon() {
        return this._icon;
    }

    get high() {
        return this._high;
    }

    get temp() {
        return this._temp;
    }

    get humidity() {
        return this._humidity;
    }

    get sr() {
        return this._sr;
    }

    get ss() {
        return this._ss;
    }

    toString() {
        return `{location: ${this.location} | description: ${this._description} | icon: ${this._icon} | temp: ${this._temp} | high: ${this._high} | low: ${this._low} | humidity: ${this._humidity} | sr: ${this._sr} | ss: ${this._ss}}`;
        //return `${this.location}: Looks like ${this.description}. It is currently ${this.temp} degrees not F/C - Maybe Kelvin? We do not do the conversions for you. We are computer scientists, not mathematicians.`;
    }
}

