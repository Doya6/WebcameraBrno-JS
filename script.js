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
			en: 'Wind Chill:',
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
		srazkyZaDen: {
			en: '/day',
			cz: '/den',
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

		teplotaVal: "",
		pocitTeplotaVal: "0",
		vlhkostVal: "0",
		tlakVal: "0",
		srazkyVal: "0",
		vitrVal: "0.0",

		compasTurn: "0",

		actualMoonPhase: 7,
		moonPhase: ["0", "30", "60", "90", "120", "180", "240", "270", "300", "330"],
		moonFullness: "0",

		sunsetTime: "",
		sunriseTime: "",

		show: false,
		imgIndex: '',
		window: {
			width: 0,
			height: 0
		},

		showProvozovatel: true

	},

	created: function () {
		this.fetchDatumCas();
		this.fromXLM();
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
		//this.fetchSunAPIdate();
	},
	destroyed() {
		window.removeEventListener('resize', this.handleResize);
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
		},

	},

	methods: {
		fetchDatumCas: function () {
			axios.post('http://mytestwww.tode.cz/WebcameraBrno/dateLast4Pics.php')
				.then(response => {
					this.datumCas = (response.data);
				}); this.fetchPicsName();

		},
		fetchPicsName: function () {
			axios.post('http://mytestwww.tode.cz/WebcameraBrno/last4PicsName.php')
				.then(response => {
					console.log(response.data);
					this.actPics = (response.data);
				});
		},
		handleResize() {
			this.window.width = window.innerWidth;
			this.window.height = window.innerHeight;
		},

		showBig(index) {
			this.imgIndex = index;
			this.show = true;
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
				"3": "49.1999875N, 16.6095411E",
				"4": "49.2034436N, 16.6069339E"
			};
			var znacky = [];
			var souradnice = [];
			var obr = 1;
			for (var name in data) {
				var coord = SMap.Coords.fromWGS84(data[name]);
				var options = {
					url: 'Pics/' + obr + '.png'
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
		showProvozovatel(){
			this.showProvozovatel = !this.showProvozovatel;
		},

		fromXLM() {
			axios.get('weewx/rss.xml')
				.then(response => {
					var xmlText = response.data;
					var parser = new DOMParser(),
						xmlDOC = parser.parseFromString(xmlText, "text/xml");
					var teplotaValTest = ((xmlDOC.getElementsByTagName)("outsideTemperature")[0].childNodes[0].nodeValue).slice(0, -2);
					if (teplotaValTest.includes("N")) {
						this.teplotaVal = "-";
					} else { this.teplotaVal = teplotaValTest }
					this.pocitTeplotaVal = ((xmlDOC.getElementsByTagName)("windchill")[0].childNodes[0].nodeValue).slice(0, -2);
					var vlhkostValTest = (xmlDOC.getElementsByTagName)("humidity")[0].childNodes[0].nodeValue;
					if (vlhkostValTest.includes("N/A")) {
						this.vlhkostVal = "-";
					} else { this.vlhkostVal = vlhkostValTest }
					this.tlakVal = (xmlDOC.getElementsByTagName)("pressure")[0].childNodes[0].nodeValue;
					this.srazkyVal = ((xmlDOC.getElementsByTagName)("rain")[0].childNodes[0].nodeValue)//.slice(0, -2);
					this.vitrVal = (xmlDOC.getElementsByTagName)("wind")[0].childNodes[0].nodeValue;
					this.compasTurn = ((xmlDOC.getElementsByTagName)("windFrom")[0].childNodes[0].nodeValue).slice(0, -1);
					this.sunriseTime = (xmlDOC.getElementsByTagName)("sunrise")[0].childNodes[0].nodeValue;
					this.sunsetTime = (xmlDOC.getElementsByTagName)("sunset")[0].childNodes[0].nodeValue;
					var moonPhase = (xmlDOC.getElementsByTagName)("moonPhase")[0].childNodes[0].nodeValue;
					switch (moonPhase) {
						case "New Moon":
							this.moonPhase = "0";
							brake;
						case "Young Moon":
							this.moonPhase = "30";
							brake;
						case "Waxing Crescent":
							this.moonPhase = "60";
							brake;
						case "Waxing Quarter":
							this.moonPhase = "90";
							brake;
						case "Waxing Gibbous":
							this.moonPhase = "120";
							brake;
						case "Full Moon":
							this.moonPhase = "180";
							brake;
						case "Wanning Gibbous":
							this.moonPhase = "240";
							brake;
						case "Wanning Quarter":
							this.moonPhase = "270";
							brake;
						case "Wanning Crescent":
							this.moonPhase = "300";
							brake;
						case "Old Moon":
							this.moonPhase = "330";
							brake;
					}
					this.moonFullness = (xmlDOC.getElementsByTagName)("moonFullness")[0].childNodes[0].nodeValue;

				});
		},

	}

});

