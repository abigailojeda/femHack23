# 👩🏻‍💻 International FemHack Vol.II 📊 - Frontend Challenge  
The Frontend FemHack Challenge organized by nuwe in this III edition consisted in developing a landing page to show data visualization in an attractive way. 
To carry out this challenge I used the [backend](https://github.com/nuwe-reports/femhack-II-frontend-challenge) that they have provided, and the tasks consisted of making requests to the backend endopints and display the data in graphs.

![](screenshots/header.png)  
  
## 🤩 Objectives achieved:

➜ Manage the backend data to display them correctly  
➜ Using a chart library  
➜ Using a map library  
➜ Displaying the layout result in a landing page
➜ Develop a responsive layout  
➜ Using a map library  
➜ Use animations  
  
## 🥺 Goals I didn't achieve:

➜ I would have liked to have had more time to dedicate to the design and create something really visually stunning
➜ I would have liked to make more interactive animations 

---

![](screenshots/responsive.png)

---

## 📂 What do you need to have installed on your computer?

➜ [Docker](https://www.docker.com/)  
➜ Node [LTS Version](https://nodejs.org/en/)  
➜ Angular: npm install -g @angular/cli  
  
## ⚙️💾 Download & Settings to test the frontend   

➜ Create a folder for the project and run  
➜ Clone project :  git clone "https://github.com/abigailojeda/femHack23.git" .  
➜ 💁🏻 Tip: With the "." at the end you specify that you want the project to be cloned in that folder, and not create a new folder inside it to save the cloned project   

Once you have the cloned project you will only have to execute in your console the commands  
➜ npm i  
➜ npm start

---

### 📚 This project use:

I have developed the frontend with [Angular](https://angular.io/) v14

➜ Lazy loading modules  
➜ RxJS  
➜ Pipes

➜ [Apexcharts](https://apexcharts.com/)  
➜ [Leaflet](https://leafletjs.com/)  
➜ [Animate.css](https://animate.style/)  

---
### 🎨 Design resources:

➜ [Roboto font - Google fonts](https://fonts.google.com/specimen/Roboto?query=roboto)  
➜ [Opensource illustrations](https://undraw.co/search)  
➜ [CSS background patterns](https://www.magicpattern.design/tools/css-backgrounds)  
➜ [Nice gradients for css backgrounds](https://webgradients.com/)  
➜ [svg icons](https://heroicons.com/)  
➜ [emojis for README](https://emojidb.org/unicorn-emojis)  
➜ [mockup image](https://www.pexels.com/es-es/foto/mano-telefono-inteligente-maqueta-telefono-movil-6612388/)  

---

# 📝 TASKS  


I created a component for each task and handled the data with a service to make the requests with HttpClient  

```javascript
export class ChartsService {
  private apiUrl:string= environment.url;

  constructor(private http: HttpClient) {}

  //users x year ( all the world )
  getUsersByYear(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/internet-users/${year}`);
  }
  //users x year ( specifying countries )
  getUsersAndCountries(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/year/${year}`);
  }

  getUsersForMultipleYears(years: number[]): Observable<any[]> {
    const requests: Observable<any>[] = years.map((year) => this.getUsersByYear(year));
    return forkJoin(requests);
  }

  //countries
  getCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/countries`);
  }
  
  //users x year x country
  getUsersByCountryAndYear(country: string, year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/country/${country}/year/${year}`);
  }
}
```

### ➜ CHART 1 : Internet Users x Year

![](screenshots/firstTask.png)

### ➜ CHART 2 : Internet Users x Year x Country

![](screenshots/secondTask.png)

### ➜ CHART 3 : Top 10 Countries using internet x Year

![](screenshots/thirdTask.png)

### ➜ TAKS 2 : Animations

One of the objectives of this challenge was to animate the graphics to make them more attractive to the user. The apexcharts library allows to configure the animation that the graphic will show when rendered:

```javascript
this.chart = {
  type: "bar",

    ...

  animations: {
    enabled: true,
    easing: "linear",
    speed: 2000,

    dynamicAnimation: {
      enabled: true,
      speed: 2000,
    },
  },
};
```  
  
On the other hand, Animate.css is very easy to use and has very good results for animating web page elements. In this case I have used it to animate the title of the header.  

### ➜ TAKS 3 : World map data visualization  

![](screenshots/mapTask.png)
---

🙋🏻‍♀️[Abigail Ojeda Alonso](https://es.linkedin.com/in/abigail-ojeda)
