import { HomePageComponent } from './home.component';

const xmlWithOneProgramme = `<?xml version="1.0" encoding="UTF-8"?>
                            <programme-data>
                            <title>Programme Data</title>
                            <programme id="1">
                            <name>Deadpool</name>
                            <image-path>../../assets/programmeShowChoices/deadpool.jpg</image-path>
                            <mood>Wide Awake, Fearless</mood>
                            </programme>
                            </programme-data>`;

const xmlWithFiveProgramme = `<?xml version="1.0" encoding="UTF-8"?>
                            <programme-data>
                            <title>Programme Data</title>
                            <programme id="1">
                            <name>Deadpool</name>
                            <image-path>../../assets/programmeShowChoices/deadpool.jpg</image-path>
                            <mood>Wide Awake, Fearless</mood>
                            </programme>
                            <programme id="2">
                            <name>Beauty and the Beast</name>
                            <image-path>../../assets/programmeShowChoices/beautybeast.jpg</image-path>
                            <mood>Happy</mood>
                            </programme>
                            <programme id="3">
                            <name>Secret Life of Pets</name>
                            <image-path>../../assets/programmeShowChoices/secretlifepets.jpg</image-path>
                            <mood>Happy, Calm</mood>
                            </programme>
                            <programme id="4">
                            <name>The Danish Girl</name>
                            <image-path>../../assets/programmeShowChoices/danishgirl.jpg</image-path>
                            <mood>Sad</mood>
                            </programme>
                            <programme id="5">
                            <name>X-men</name>
                            <image-path>../../assets/programmeShowChoices/xmen.jpg</image-path>
                            <mood>Tired</mood>
                            </programme>
                            </programme-data>`;


describe('Home Component', () => {
    let home: HomePageComponent;
    beforeEach(() => {
        home = new HomePageComponent();
    });

    it('should populate programmes array with 1 programme when XML Proccessed', () => {
        home.uploadedFileData = xmlWithOneProgramme;
        home.processXML();
        expect(home.programmes.length).toBe(1);
    });

    it('should populate programmes array with 5 programme when XML Processed', () => {
        home.uploadedFileData = xmlWithFiveProgramme;
        home.processXML();
        expect(home.programmes.length).toBe(5);
    });

    it('add one to suggestedProgrammes from programmes array when slider moved', () => {
        home.uploadedFileData = xmlWithOneProgramme;
        home.processXML();
        home.populateSuggestedProgramme('Wide Awake, Fearless', 100);
        expect(home.suggestedProgrammes.length).toBe(1);
    });
});

