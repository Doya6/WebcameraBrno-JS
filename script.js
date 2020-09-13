'use strict';
const red = '#E60200';

new Vue({
	el: '#app',

	data: {
		currLang: 'cz',
		czBarva: 'red',
		enBarva: 'white',
		DegC: 'red',
		DegF: 'white',

		message: {
			en: 'The pictures have been taken on the ',
			cz: 'Fotky byly pořízeny ',
		},
		datumCas: [],

		datumCasLang: {
			en: '1',
			cz: '0',
		},

		smerpohledu: {
			en: 'View Direction',
			cz: 'Směr pohledu',
		},

		kamera: {
			en: 'CAMERA',
			cz: 'KAMERA',
		},

		teplota: {
			en: 'Temperature:',
			cz: 'Teplota:',
		},

		pocitteplota: {
			en: 'Wind Chill Temperature:',
			cz: 'Pocitová teplota:',
		},

		vlhkost: {
			en: 'Humidity:',
			cz: 'Vlhkost:',
		},

		tlak: {
			en: 'Pressure:',
			cz: 'Tlak:',
		},

		srazky: {
			en: 'Rain:',
			cz: 'Srážky:',
		},
		wind: {
			en: 'Wind:',
			cz: 'Vítr:',
		},

		moonPhaseName: {
			en: ["New Moon", "Young Moon", "Waxing Crescent", "Waxing Quarter", "Waxing Gibbous", "Full Moon", "Wanning Gibbous", "Wanning Quarter", "Wanning Crescent", "Old Moon"],
			cz: ["Novoluní", "Mladý měsíc", "Dorůstající srpek", "První čtvrt", "Dorůstající měsíc", "Úplněk", "Couvající měsíc", "Poslední čtvrt", "Ubývající srpek", "Starý měsíc"],
		},

		windowWidth: window.innerWidth,

		kamera1: false,
		kamera2: true,
		kamera3: false,
		kamera4: false,

		actPics: [],

		unit: "C",

		teplotaVal: 23,
		pocitTeplotaVal: 21,
		vlhkostVal: 35,
		tlakVal: 1050,
		srazkyVal: 4,
		vitrVal: 25,

		compasTurn: 45,

		actualMoonPhase: 7,
		moonPhase: ["0", "30", "60", "90", "120", "180", "240", "270", "300", "330"],

		sunsetTime: "21:35",
		sunriseTime: "6:45",

	},

	created: function () {
		this.fetchDatumCas();
	},
	mounted: function () {
		this.loadMap();

		window.addEventListener(
			"orientationchange",
			this.handlerOrientationChange
		);

		//		window.onresize = this.resized();
	},

	computed: {
		onMobile() {
			if (this.windowWidth < 600) {
				return true;
			} else return false;
		},
		compasRotate() {
			return { transform: 'rotate(' + this.compasTurn + 'deg)' }
		},
		teplVal() {
			if (this.unit === 'F') {
				return `${Math.round(this.teplotaVal * 1.8 + 32)} °F`;
			} return `${this.teplotaVal} °C`;
		},
		pocTeplVal() {
			if (this.unit === 'F') {
				return `${Math.round(this.pocitTeplotaVal * 1.8 + 32)} °F`;
			} return `${this.pocitTeplotaVal} °C`;
		}
	},

	methods: {
		fetchDatumCas: function () {
			axios.post('/WebcameraBrno/dateLast4Pics.php')
				.then(response => {
					this.datumCas = (response.data);
				}); this.fetchPicsName();

		},
		fetchPicsName: function () {
			axios.post('/WebcameraBrno/last4PicsName.php')
				.then(response => {
					this.actPics = (response.data);
				});
		},

		switchEN() {
			this.currLang = 'en';
			this.enBarva = 'red';
			this.czBarva = 'white';
		},
		switchCZ() {
			this.currLang = 'cz';
			this.czBarva = 'red';
			this.enBarva = 'white';
		},
		switchDegC() {
			this.unit = 'C';
			this.DegC = 'red';
			this.DegF = 'white';
		},
		switchDegF() {
			this.unit = 'F';
			this.DegF = 'red';
			this.DegC = 'white';
		},

		schovej(c) {
			if (c === 1) {
				this.kamera1 = !this.kamera1;
			}
			if (c === 2) {
				this.kamera2 = !this.kamera2;
			}
			if (c === 3) {
				this.kamera3 = !this.kamera3;
			}
			if (c === 4) {
				this.kamera4 = !this.kamera4;
			}
		},

		loadMap() {
			var center = SMap.Coords.fromWGS84(16.6118572, 49.2003031);
			var cameraPosition = SMap.Coords.fromWGS84(16.6148050, 49.2044978);
			var m = new SMap(JAK.gel("m"), center, 14);
			m.addDefaultLayer(SMap.DEF_BASE).enable();
			m.addDefaultControls();

			var layer = new SMap.Layer.Marker();
			m.addLayer(layer);
			layer.enable();

			var options = {};
			var marker = new SMap.Marker(cameraPosition, "myMarker", options);
			layer.addMarker(marker);
			// add view lines
			var glayer = new SMap.Layer.Geometry();
			m.addLayer(glayer);
			glayer.enable();

			var points1 = [
				SMap.Coords.fromWGS84(16.6148050, 49.2044978),
				SMap.Coords.fromWGS84(16.3461356, 49.2476725)
			];
			var points2 = [
				SMap.Coords.fromWGS84(16.6148050, 49.2044978),
				SMap.Coords.fromWGS84(16.3736953, 49.1318658)
			];
			var points3 = [
				SMap.Coords.fromWGS84(16.6148050, 49.2044978),
				SMap.Coords.fromWGS84(16.5444567, 49.0525889)
			];
			var points4 = [
				SMap.Coords.fromWGS84(16.6148050, 49.2044978),
				SMap.Coords.fromWGS84(16.7629978, 49.0510111)
			];
			var points5 = [
				SMap.Coords.fromWGS84(16.6148050, 49.2044978),
				SMap.Coords.fromWGS84(16.8797589, 49.1588858)
			];
			var options1 = {
				color: "#f00",
				width: 3
			};
			var polyline = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, points1, options1);
			glayer.addGeometry(polyline);
			var polyline = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, points2, options1);
			glayer.addGeometry(polyline);
			var polyline = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, points3, options1);
			glayer.addGeometry(polyline);
			var polyline = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, points4, options1);
			glayer.addGeometry(polyline);
			var polyline = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, points5, options1);
			glayer.addGeometry(polyline);

			//add view numbers
			var data = {
				"1": "49.2010881N, 16.6206119E",
				"2": "49.1985644N, 16.6154619E",
				"3": "49.2002189N, 16.6081558E",
				"4": "49.2041444N, 16.6063856E"
			};
			var znacky = [];
			var souradnice = [];
			var obr = 1;
			for (var name in data) {
				var coord = SMap.Coords.fromWGS84(data[name]);
				var options = {
					url: 'Pics/'+ obr +'.png'
				}
				var znacka = new SMap.Marker(coord, null, options);
				souradnice.push(coord);
				znacky.push(znacka);
				obr++;
			}
			var vrstva = new SMap.Layer.Marker();     /* Vrstva se značkami */
			m.addLayer(vrstva);                          /* Přidat ji do mapy */
			vrstva.enable();                         /* A povolit */
			for (var i = 0; i < znacky.length; i++) {
				vrstva.addMarker(znacky[i]);
			}

		},


		handlerOrientationChange() {
			switch (window.screen.orientation.type) {
				case "portrait-primary":
					this.setCamera2();
				case "landscape-primary":
					this.setCamerasOn();
			}
		},

		setCamerasOn() {
			this.kamera1 = true;
			this.kamera2 = true;
			this.kamera3 = true;
			this.kamera4 = true;
		},
		setCamera2() {
			this.kamera1 = false;
			this.kamera2 = true;
			this.kamera3 = false;
			this.kamera4 = false;
		},

		//		resized() {
		//			if (this.onMobile){
		//			this.setCamera2();
		//			}
		//			if (!this.onMobile){
		//			this.setCamerasOn();
		//			}
		//		}

	}

});

