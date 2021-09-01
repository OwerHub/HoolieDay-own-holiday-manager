# HoollieDayz

# Save your own Holidays, save them to a database, and send them to a Google Calendar

A Hooliedayz egy régi szerelem-projekt. Még a tanulmányaim előző szakaszában kezdtem el, jó néhány megoldást ezen teszteltem, ezt választottam a leadandó vizsgafeladatnak is.

Néhány részen még követni lehet a fejlődésem különböző szakaszait. A backendet szinte teljesen átalakítottam, akad benne néhány, már nem aktív, öröklött kód, amit egyelőre megtarttottam későbbi vizsgálat céljára. Több rész ideiglenesen van benne, hogy megfeleljen a vizsgakövetelményeknek.

A név a fejlesztés során változott,így lehetséges, hogy egyszerre használom a Holydays, Holydayz, Holidays, kifejezéseket, ezek később egységesen HoolieDayz értéket fogják felvenni.

A fejlesztés folyamatosan változó mivolta miatt a front-endnek nincs egységes stílusa. A vizsga után kialakításra kerül a stílus, és (valószínűleg tailwind gyakorlatként), a teljes frontend újra lesz tervezve és programozva

//--------english----

Hooliedayz is an old love project. I started even in the previous stage of my studies, I tested quite a few solutions on this, I also chose this as the exam task to be passed.

In some parts U can still follow the different stages of my development. I have almost completely redesigned the backend, there are some legacy codes that are no longer active that I have kept for the time being for later investigation. Several sections are temporarily in it to meet the exam requirements.

The name has changed during development, so it is possible that I use the terms Holydays, Holydayz, Holidays, at the same time, these will later take on a uniform HoolieDayz value.

Due to the ever-changing nature of development, the front-end does not have a unified style. After the exam, the style is developed and (probably as a tailwind exercise), the entire frontend will be redesigned and reprogrammed

//-----------------------------------install--------------------------------
// docker:

// github

- you will need node and npm to use

- Create an API key in console.cloud.google.com
- insert a Google Calendar API from a google libary
- Set a redirect URL
  http://localhost:3000/login and
  http://localhost:3000 (just for the safety)
- create a Atlas MongoDB database

- in the backend, U need an .env file

env file is looks like that:
CONNECTION_STRING= <your mongoDB connection String>
API_KEY= <your API key from Google>
CLIENT_ID= <your Client ID from Google>
CLIENT_SECRET= <your client secret from Google>
SECRET= <your secret word>
REDIRECT_URL=http://localhost:3000/login

- start an npm install in the backend
- and do it again in the frontend
- if U want, type npm test in the backend. U can see a lot of endpoint test
- start the backend start.js (or npm start)
- start the frontend with npm start.

- and it must be work!

//-------using------------

- use:

  - U must login with Google. You must give and acess to Google Calendar
  - The HoolieDays search U in the database. If it cant find, create a new user docs for U
  - When U havent got a Holiday in the database, the program open the "new HoolieDay" modal. U can create one.
  - Or create more.
  - The Holidays can be 4 different type. Every type has an own color

  - U can switch a SetUserDatas, a NewHoolieDay, and a Hooliedays mode in the head

  - in Hooliedayz mode:

    - You can set what type of Holidays you want to display. (just click the type buttons)U can set multiply types
    - you can set what to sort the events (remaining time, alphabet or date from Januar 1 to December 31)

    - You can update the datas of any HoolieDay
    - You can delete any Hoolieday
    - You can send a HoolieDay to Google calendar

      - in the first send, the program create a new layer in your Google Calendar. Its name "Hooliedays". Please dont rename it.
      - the HoolieDay will be save in your Calendar

    - In SetUser Mode:
      - You can change your nickname
      - You can create a new note (these will be user types in a later version)
        - please write a valid color code, the program not validate yet ( example: #1255ff)
      - you can modify a note (the color code same )
      - And U can sing Out from the program.
