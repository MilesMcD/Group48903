/*
TUTORIAL FOR GEOLOCATION & BASIC FRAMEWORK PROVIDED BY: https://code.tutsplus.com/tutorials/code-a-real-time-nativescript-app-geolocation-and-google-maps--cms-29001
by Wernher-Bel Ancheta

Some documentation comes from his tutorial.

In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
This script handles the scripting on our main page. It calls our main view model.

By Miles McDowall
*/
var createViewModel = require("./main-view-model").createViewModel;
var mapsModule = require("nativescript-google-maps-sdk");
var dialog = require("ui/dialogs");
var http = require("http");


/*
Event handler for moving to the correct page. Currently displays marker information in dialog and console. 
*/
function onMarkerEvent(args) {
	dialog.alert(args.marker.title);
	//args.marker.title  "Dewing"
   console.log("Marker Event: '" + args.eventName
                + "' triggered on: " + args.marker.title
                + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
}
function onNavigatingTo(args) {

/*	
	populate building info in the database. Uncommenting this code will duplicate the database if you already have a copy!
*/
/*
var campusBuildings =
[
	{
		"name"		: "Anderson Athletic Center",
		"description"	: "Anderson Athletic Center is home to the practice and competition arena for the Kalamazoo College volleyball and men's and women's basketball teams. The main court features a new court design (2013), new scoreboard (2010) and NBA-style roll-away baskets. The gymnasium area can also be used to run three courts simultaneously or two college sized courts. The facility is also available to club sports, student organizations, intramurals and the overall college community.",
		"moreInfo"	: "The main lobby (east entrance) serves as entrance for varsity athletic contests and houses a concession stand and restrooms. The Kalamazoo College Athletic Hall of Fame is also located in the main lobby along with trophy display cases.\n\nThe second floor (west entrance) serves as the main entrance during normal business hours and provides access to the main athletic offices and the physical education department. The west end of the building also features a classroom, conference room, general locker rooms, varsity locker rooms for volleyball and basketball, the fitness center, an athletic training room, a dance sutdio and laundry/storage facilities.",
		"hours"		: "Monday:	06:30AM - 12:00AM (Kalamazoo College ID required to gain access after 5:00PM)\nTuesday:	06:30AM - 12:00AM (Kalamazoo College ID required to gain access after 5:00PM)\nWednesday:	06:30AM - 12:00AM (Kalamazoo College ID required to gain access after 5:00PM)\nThursday:	06:30AM - 12:00AM (Kalamazoo College ID required to gain access after 5:00PM)\nFriday:	06:30AM - 10:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nSaturday:	12:00PM - 08:00PM (Kalamazoo College ID required to gain access)\nSunday:	12:00PM - 10:00PM (Kalamazoo College ID required to gain access)",
		"latlng"	: "42.290059, -85.598369",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Admission/Welcome Center",
		"description"	: "",
		"moreInfo"	: "",
		"hours"		: "Monday:	00:00 - 00:00\nTuesday:	00:00 - 00:00\nWednesday:	00:00 - 00:00\nThursday:	00:00 - 00:00\nFriday:	00:00 - 00:00\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.292138, -85.601180",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Arcus Center for Social Justice Leadership",
		"description"	: "The Arcus Center for Social Justice Leadership (ACSJL) is an initiative of Kalamazoo College whose mission is to develop and sustain leaders in human rights and social justice through education and capacity-building.",
		"moreInfo"	: "Social Justice recognizes the inherent dignity of all people and values every life equally. It calls for both personal reflection and social change to ensure that each of us has the right and the  opportunity to thrive in our communities, regardless of our identities. When we acknowledge that oppression exists and work together to end systemic discrimination and structural inequities, we increase the promise of a more just world.\n\nThe ACSJL is non-partisan and non-sectarian.  It seeks to engage a rich diversity of individuals, groups, and perspectives in its activities.",
		"hours"		: "Monday:	00:00 - 06:00PM\nTuesday:	00:00 - 06:00PM\nWednesday:	00:00 - 06:00PM\nThursday:	00:00 - 06:00PM\nFriday:	00:00 - 03:00PM\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.290148, -85.603558",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Athletic Complex",
		"description"	: "The Athletic Complex hosts the following sites:\n\nAngell Football Field/Calder Fieldhouse\nMacKenzie Soccer Field (Soccer/Lacrosse)\nSoftball Field\nWoodworth Baseball Field",
		"moreInfo"	: "The Kalamazoo College Athletic Fields Complex was completely renovated in 2011-12. The original location of the football field was the only piece that remained in its original position while undergoing a complete renovation with new artificial turf, new bleachers, a new scoreboard and a new stadium services building. All other fields were relocated to make better use of the space available while allowing for construction of a new intramural/recreation field in the northeast corner. The new athletic fields all included new turf or grass/dirt as well as new bleachers, dugouts and scoreboards.\n\nCalder Fieldhouse was replaced with the new Kalamazoo College Fieldhouse on the southeast corner of the complex. The new fieldhouse features locker rooms for each team equipped with sound and video capabilities. The locker room area also features locker rooms for coaches and officials as well as auxillary workspace for coaches and staff. A new expanded athletic training room was included that includes private office space for doctors and medical personnel.\n\nThe main entrance/lobby of the fieldhouse features trophy display cases for field sports as well as an athletic fields history wall. The upper level on the west end houses the Hornets Suite, a large multi-purpose room which overlooks the football field and is used for team meetings, campus gatherings, banquets and other special events.\n\nAngell Football Field/Calder Fieldhouse\n\nAngell Field was completely renovated in 2011-12 and is home to the Kalamazoo College football team. The renovated field features new artificial turf with heat reducing technology.\n\nThe home and visitor bleachers were completely renovated and include access to restrooms on both sides of the field.\n\nA new stadium services building was built on the home (west) side of the field. The lower level houses a concenssion stand and restrooms. The middle level supports media and game operations while the upper level has coaching booths and an area for videotaping and video streaming.\n\nMacKenzie Soccer Field (Soccer/Lacrosse)\n\nMacKenzie Field sits on the west side of the renovated complex (2011-12) and is home to the men's and women's soccer teams and the men's and women's lacrosse teams.\n\nMacKenzie Field is a state-of-the-art lighted turf field and features the Hornet logo as its centerpiece. It is one of the best field complexes in the entire West Michigan region and features a new electronic scoreboard, bleacher seating for nearly 400 fans, and an enclosed press box facility.\n\nSoftball Field\n\nThe Kalamazoo College Softball Field sits on the west side of the renovated complex (2011-12) between MacKenzie Field and Woodworth Field.\n\nThe Kalamazoo College Softball Field features a composite dirt infield with a grass outfield and warning track. A new 10-inning scoreboard was installed along with new bleachers, in-ground dugouts, press box, bullpens and a hitting tunnel.\n\nWoodworth Baseball Field\n\nWoodworth Field sits on the northwest corner of the renovated complex (2011-12) just north of the softball field.\n\nWoodworth Field features a composite dirt and grass infield with a grass outfield. A new scoreboard was installed along with new bleachers, new dugouts and a press box.",
		"hours"		: "Monday:	00:00 - 00:00\nTuesday:	00:00 - 00:00\nWednesday:	00:00 - 00:00\nThursday:	00:00 - 00:00\nFriday:	00:00 - 00:00\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.286128, -85.606787",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Crissey Residence Hall",
		"description"	: "Crissey Hall is an upper class living community and located on the north-east end of campus. Crissey offers suite-style living with an open community feel. Students enjoy hanging out in the grassy area in front of Crissey during fall and spring days, playing Frisbee, grilling out with friends, or just sitting on a blanket reading or socializing. Crissey Hall is also conveniently located right next to the Natatorium.",
		"moreInfo"	: "",
		"hours"		: "24-hour swipe access with valid Kalamazoo College ID",
		"latlng"	: "42.291185, -85.597996",
		"longitude"	: "",
		"condition"	: "",
		"machines"	: ["Drinks Vending", "Snacks Vending"],
		"malfunction"	: []
	},
	{
		"name"		: "DeWaters Residence Hall",
		"description"	: "DeWaters Hall is an upper class community located on the south-west side of campus at the “top of the hill” next to the Chapel. DeWaters is the smallest hall on campus. Students in DeWaters enjoy the close-knit feel of the small community.",
		"moreInfo"	: "",
		"hours"		: "24-hour swipe access with valid Kalamazoo College ID",
		"latlng"	: "42.289259, -85.602365",
		"condition"	: "",
		"machines"	: ["Drinks Vending", "Snacks Vending"],
		"malfunction"	: []
	},
	{
		"name"		: "Dewing Hall",
		"description"	: "",
		"moreInfo"	: "Dewing Hall hosts the following offices:\n\nCenter for Career and Professional Development\nCenter for Civic Engagement\nCenter for International Programs\nRecords Office/Registrar",
		"hours"		: "Monday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nTuesday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nWednesday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nThursday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nFriday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.290082, -85.601922",
		"condition"	: "",
		"machines"	: ["Drinks Vending"],
		"malfunction"	: []
	},
	{
		"name"		: "Dow Science Center",
		"description"	: "",
		"moreInfo"	: "",
		"hours"		: "Monday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nTuesday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nWednesday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nThursday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nFriday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access after 5:00PM)\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.291923, -85.600235",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Facilities Management",
		"description"	: "",
		"moreInfo"	: "",
		"hours"		: "Monday:	00:00 - 00:00\nTuesday:	00:00 - 00:00\nWednesday:	00:00 - 00:00\nThursday:	00:00 - 00:00\nFriday:	00:00 - 00:00\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.289451, -85.599070",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Fitness and Wellness Center",
		"description"	: "",
		"moreInfo"	: "",
		"hours"		: "Monday:	00:00 - 00:00\nTuesday:	00:00 - 00:00\nWednesday:	00:00 - 00:00\nThursday:	00:00 - 00:00\nFriday:	00:00 - 00:00\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.291023, -85.597080",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Harmon Residence Hall",
		"description"	: "Harmon Hall is both a first-year and upper class community located right on Academy Street next to Anderson Athletic Center. Harmon offers the widest variety of living options on campus. Harmon students enjoy a large front patio area complete with picnic tables, benches and a grill. It is a great place to relax with friends or to be outdoors to read or study.",
		"moreInfo"	: "Harmon Residence Hall hosts the office for the LandSea program.\n\n1946\nDedicated October 16, 1948\nHonoring Claude M. Harmon\nTrustee of Kalamazoo College",
		"hours"		: "24-hour swipe access with valid Kalamazoo College ID",
		"latlng"	: "42.290071, -85.599109",
		"condition"	: "",
		"machines"	: ["Drinks Vending", "Snacks Vending"],
		"malfunction"	: []
	},
	{
		"name"		: "Hicks Center",
		"description"	: "Weimer Kerr Hicks\n1909 - 1985\n\nWeimer K. Hicks served as the twelfth president of Kalamazoo College.  Duringhis seventeen years as president (1954 - 1971), the college grew and prospered and developed the 'Kalamazoo Plan,' which put Kalamazoo in the forefront of innovative higher education.\n\n A successful administrator and strong leader, President Hicks stabilized the college's enrollment and finances and led the remarkable transformation of curriculum and campus that made the college a leader in international liberal arts education.  By 1971, enrollment had risen from 356 to almost 1,400; the endowment had grown from less than $1 million to more than $14 million; and the campus had expanded across academy street, adding nine buildigns and renovating five others.\n\nWeimer Hicks was known for his commitment to Kalamazoo College and his attention to every detail of the place and its people: a broken sidewalk, a crowded classroom, a trouobled student or staff member.  The president and his wife, Jean, made their home the social center of the college, entertaining students, faculty, trustees, and friends of the college.  President Hicks had a remarkable ability to remember the names and interests of others, especially students.  It is fitting that the student center is named for this gentleman who cared so deeply about Kalamazoo College students.",
		"moreInfo"	: "Hicks Center hosts the following:\n\nBookstore\nFirst Year Experience\nHealth Services\nMail Center\nSecurity Office\nStudent Development\nStudent Union Desk\nWelles Dining Hall and Stone Room",
		"hours"		: "Monday:	07:00AM - 12:00AM (Kalamazoo College ID required to gain access after 12:00AM)\nTuesday:	07:00AM - 12:00AM (Kalamazoo College ID required to gain access after 12:00AM)\nWednesday:	07:00AM - 12:00AM (Kalamazoo College ID required to gain access after 12:00AM)\nThursday:	07:00AM - 12:00AM (Kalamazoo College ID required to gain access after 12:00AM)\nFriday:	07:00AM - 12:00AM (Kalamazoo College ID required to gain access after 12:00AM)\nSaturday:	07:00AM - 12:00AM (Kalamazoo College ID required to gain access after 12:00AM)\nSunday:	07:00AM - 12:00AM (Kalamazoo College ID required to gain access after 12:00AM)",
		"latlng"	: "42.289146, -85.600087",
		"condition"	: "",
		"machines"	: ["Drinks Vending", "Snacks Vending", "Ice Cream Vending"],
		"malfunction"	: []
	},
	{
		"name"		: "Hoben Residence Hall",
		"description"	: "Hoben Hall is a first-year community and the most centrally located residence hall on campus, resting right at the base of the quad. Many Hoben residents enjoy beautiful views of the quad from their rooms, and the hall is close to virtually everything on campus.",
		"moreInfo"	: "Erected 1936\nThe gift of Mr. & Mrs. E. A. DeWaters\n\nAllan Hoben (1874 - 1935)\nThe eigth President of Kalamzoo College (1922 - 1935), Allan Hoben is widelyconsidered to have been one of its finest leaders.  A native of new Brunswick, he earned a doctorate from the University of Chicago and achieved recognition there and elsewhere as a teacher and scholar.  He was an ordained minister with a strong social gospel perspective and with experience in urban social and political reform.  Dr. Hoben's independence of mind, moral conviction, and passion for educational excellence were legendary, and he devoted the last thirteen years of his life in service to Kalamazoo College, articulating and implementing a powerful and enduring vision.\n\nThe campus itself is one expression of this vision.  Many of the buildings on the quadrangle, including Olds Science Hall, Stetson Chapel, and Mandelle Hall, the college's first free-standing library, were completed during Hoben's presidency.  This remarkable physical transformation of the college provided the setting for a spirit and an ideal that Dr. Hoben described as follows:\n\nKalamazoo College is a fellowship in learning.  Out of the interplay with minds past and present and in friendly contact with faculty members, the student evolves his best self and therefore his charter of service to mankind to this fellowship, this self-discovery, with its attendant joy of purposeful living, Kalamazoo College welcomes succeeding generations of students and in due course sends them out into the wide, wide world possessing something of the likeness and life of their alma mater--the scholar's spirit dedicated to human welfare.",
		"hours"		: "24-hour swipe access with valid Kalamazoo College ID",
		"latlng"	: "42.289642, -85.599343",
		"condition"	: "",
		"machines"	: ["Drinks Vending", "Snacks Vending"],
		"malfunction"	: []
	},
	{
		"name"		: "Hodge House",
		"description"	: "President's residence",
		"moreInfo"	: "",
		"hours"		: "Non-accessible to public.",
		"latlng"	: "",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Humphrey House",
		"description"	: "",
		"moreInfo"	: "",
		"hours"		: "Monday:	00:00 - 05:00PM\nTuesday:	00:00 - 05:00PM\nWednesday:	00:00 - 05:00PM\nThursday:	00:00 - 05:00PM\nFriday:	00:00 - 05:00PM\nSaturday:	CLOSED\nSunday:	CLOSED",
		"latlng"	: "42.290676, -85.599512",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Light Fine Arts Building",
		"description"	: "",
		"moreInfo"	: "The Light Fine Arts Building hosts the following:\n\nDalton Theatre\nDungeon Theatre\nRecital Hall",
		"hours"		: "Monday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 1:00AM)\nTuesday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 1:00AM)\nWednesday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 1:00AM)\nThursday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 1:00AM)\nFriday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 1:00AM)\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.290762, -85.600480",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Living/Learning Houses",
		"description"	: "",
		"moreInfo"	: "",
		"hours"		: "Students who reside in Living/Learning Houses have a physical key to access their building.",
		"latlng"	: "42.289560, -85.604018",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Mandelle Hall",
		"description"	: "",
		"moreInfo"	: "Mandelle Hall hosts the following offices:\n\nAdmission & Financial Aid\nAdvancement Office\nBusiness Office\nOlmsted Room\nPresident/Provost Office",
		"hours"		: "Monday:	00:00 - 05:00PM\nTuesday:	00:00 - 05:00PM\nWednesday:	00:00 - 05:00PM\nThursday:	00:00 - 05:00PM\nFriday:	00:00 - 05:00PM\nSaturday:	CLOSED\nSunday:	CLOSED",
		"latlng"	: "42.290114, -85.600666",
		"condition"	: "",
		"machines"	: ["Drinks Vending", "Snacks Vending"],
		"malfunction"	: []
	},
	{
		"name"		: "Markin Racquet Center",
		"description"	: "The Markin Racquet Center is the indoor home of the Kalamazoo College men's and women's tennis teams. Four tennis courts are available inside Markin along with locker rooms. Markin also features three racquetball courts.",
		"moreInfo"	: "Kalamazoo College's men's and women's tennis coaches work out of offices that also serve the USTA Boys' 18 & 16 National Championships. The main lobby of Markin houses display cases that highlight Kalamazoo's numerous conference (MIAA) championships and seven NCAA III men's tennis national championships.\n\nKalamazoo College's wellness director also has an office in Markin that accompanies workout space for faculty and staff.",
		"hours"		: "Monday:	00:00 - 10:00PM\nTuesday:	00:00 - 10:00PM\nWednesday:	00:00 - 10:00PM\nThursday:	00:00 - 10:00PM\nFriday:	00:00 - 10:00PM\nSaturday:	00:00 - 07:00PM\nSunday:	00:00 - 10:00PM",
		"latlng"	: "42.291023, -85.597080",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Natatorium",
		"description"	: "The Kalamazoo College Natatorium is home to the Kalamazoo College men's and women's swimming and diving teams.",
		"moreInfo"	: "The pool features six lanes and two 1-meter diving boards and one 3-meter board.\n\nMen's and women's locker rooms are adjacent to the pool deck while certificates for all of Kalamazoo's All-American swimmers line the main hallway.",
		"hours"		: "Monday:	00:00 - 00:00\nTuesday:	00:00 - 00:00\nWednesday:	00:00 - 00:00\nThursday:	00:00 - 00:00\nFriday:	00:00 - 00:00\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.290768, -85.598336",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Nelda K. Balch Playhouse",
		"description"	: "",
		"moreInfo"	: "",
		"hours"		: "Monday:	00:00 - 00:00\nTuesday:	00:00 - 00:00\nWednesday:	00:00 - 00:00\nThursday:	00:00 - 00:00\nFriday:	00:00 - 00:00\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.291141, -85.599798",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Olds-Upton Science Hall",
		"description"	: "In 1927 Olds Science Hall was built with funds donated by the trustee R.E. Olds. It was built to house the Chemistry and Physics departments and included laboratories and classrooms. In 1956 the Upton Science Hall was built onto Olds. It was named after another trustee, Louis C. Upton, and it housed the Biology and Mathematics Departments. The Funds for the Future campaign allowed for Olds-Upton to be renovated in the 1980s. It was again renovated in the 1994-95 academic year. With the addition of the Dow Science Building, Olds-Upton is now used for the Physics, Mathematics, Computer Science, and Psychology Departments.",
		"moreInfo"	: "Olds-Upton Science Hall hosts the following:\n\nMath and Physics Center\nCollaboration Center for Computer Science",
		"hours"		: "Monday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 12:00AM)\nTuesday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 12:00AM)\nWednesday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 12:00AM)\nThursday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 12:00AM)\nFriday:	00:00 - 05:00PM (Kalamazoo College ID required to gain access between 5:00PM and 12:00AM)\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.290071, -85.599935",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Severn Residence Hall",
		"description"	: "Severn Hall is an upperclassman community and located on the north-east end of campus. Severn offers the popular suite-style living. Because of its unique design, with two separate towers on either side of the building, small groups of suites are able to develop tight floor communities, often connecting with one another for studying or socializing. Severn Hall is also conveniently located right across the street from the tennis courts.",
		"moreInfo"	: "",
		"hours"		: "24-hour swipe access with valid Kalamazoo College ID",
		"latlng"	: "42.291480, -85.598159",
		"condition"	: "",
		"machines"	: ["Drinks Vending", "Snacks Vending"],
		"malfunction"	: []
	},
	{
		"name"		: "Stetson Chapel",
		"description"	: "Stetson Chapel, built in 1931, is listed in the National Registry of Historic Places and stands at the top of the College’s “fair Arcadian hill,” boasting a commanding view of the College’s main quadrangle and the city of Kalamazoo.  The Chapel, with a seating capacity of approximately 550 (including a balcony), is built in the Georgian style with two aisles and a long chancel bounded by a semi-circular bank of windows that look out on the campus beyond.",
		"moreInfo"	: "",
		"hours"		: "Monday:	00:00 - 00:00\nTuesday:	00:00 - 00:00\nWednesday:	00:00 - 00:00\nThursday:	00:00 - 00:00\nFriday:	00:00 - 00:00\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.289605, -85.601359",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Stowe Tennis Stadium",
		"description"	: "Stowe Stadium is home to the Kalamazoo College men's and women's tennis teams as well as the USTA Boys' 18 & 16 National Championships. Stowe also hosts numerous other tournaments each year including youth levels, high school championships, and NCAA championships.",
		"moreInfo"	: "Stowe Stadium features 11 lighted tennis courts, stadium seating and a media tower. The exterior highlights the storied history of Kalamazoo College men's and women's tennis.",
		"hours"		: "Monday:	00:00 - 00:00\nTuesday:	00:00 - 00:00\nWednesday:	00:00 - 00:00\nThursday:	00:00 - 00:00\nFriday:	00:00 - 00:00\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "42.291730, -85.599414",
		"condition"	: "",
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Trowbridge Residence Hall",
		"description"	: "Trowbridge Hall is a first-year community and is located on the west side of campus. Trowbridge is the largest residence hall on campus. Trowbridge Hall offers residents numerous gathering spaces and is a vibrant community. The large natural area in front of the residence hall is the perfect location for hanging out with friends at the picnic tables, grilling out, or relaxing with a book in a spot under one of the many trees.",
		"moreInfo"	: "",
		"hours"		: "24-hour swipe access with valid Kalamazoo College ID",
		"latlng"	: "42.289742, -85.602735",
		"condition"	: "",
		"machines"	: ["Drinks Vending", "Snacks Vending"],
		"malfunction"	: []
	},
	{
		"name"		: "Tyler Little Tedrow Garden",
		"description"	: "",
		"moreInfo"	: "",
		"hours"		: "Monday:	00:00 - 00:00\nTuesday:	00:00 - 00:00\nWednesday:	00:00 - 00:00\nThursday:	00:00 - 00:00\nFriday:	00:00 - 00:00\nSaturday:	00:00 - 00:00\nSunday:	00:00 - 00:00",
		"latlng"	: "",
		
		"machines"	: [],
		"malfunction"	: []
	},
	{
		"name"		: "Upjohn Library Commons",
		"description"	: "",
		"moreInfo"	: "Upjohn Library Commons hosts the following:\n\nAudio/Visual/Production Studios\nCenter for New Media\nCollege Archives\nInformation Services\nLearning Commons\nRare Book Room\nThe Book Club Cafe",
		"hours"		: "Monday:	08:00AM - 02:00AM\nTuesday:	08:00AM - 02:00AM\nWednesday:	08:00AM - 02:00AM\nThursday:	08:00AM - 02:00AM\nFriday:	08:00AM - 10:00PM\nSaturday:	09:00AM - 10:00PM\nSunday:	11:00AM - 02:00AM",
		"latlng"	: "42.290739, -85.601800",
		
		"machines"	: [],
		"malfunction"	: []
	}
];



for (var i = 0; i < campusBuildings.length; i++)
{
	var myJSON = JSON.stringify(campusBuildings[i]);
	http.request({
		url: "http://10.0.2.2:3000/buildings",
		method: "POST",
		headers: { "Content-Type": "application/json"},
	content: myJSON
		}).then(function(r) { 
		dialog.alert(JSON.stringify(r));
		response = r.content.toJSON();
		}, function(e) {
			throw exception(e);
		});
}
	*/
	
	
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = createViewModel();
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
exports.onMarkerEvent = onMarkerEvent;