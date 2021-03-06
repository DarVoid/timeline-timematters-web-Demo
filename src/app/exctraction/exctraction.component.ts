import { LangdetectService } from "./../services/langdetect.service";
import { Color } from "ng2-charts";
import { Component, OnInit } from "@angular/core";
import { TimelineService } from "../services/timeline.service";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ThemePalette } from "@angular/material/core";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { isNull } from "util";
import { YakeService } from "../services/yake.service";

@Component({
  selector: "app-exctraction",
  templateUrl: "./exctraction.component.html",
  styleUrls: ["./exctraction.component.scss"],
})
export class ExctractionComponent implements OnInit {
  public result: any;
  public requestMade: boolean;
  public requestReceived: boolean;
  public withKeywords: boolean;
  public withKeywordsSentence: string;
  public picker: any;
  public maxValTH: number;
  public hiddenoption: boolean;
  public conteudoDefault: string;
  public loading: boolean;
  public algoritmosDate: Array<any>;
  public algoritmoSelected: string;
  public dateGranularityOptions: Array<string>;
  public dateGranularitySelected: string;
  public documentTypeOptions: Array<any>;
  public documentTypeSelected: string;
  public documentCreationTime: string;
  public languageOptions: Array<string>;
  public languagueSelected: string;
  public dateBegin: number;
  public dateEnd: number;
  public byDocOrSentece: boolean;
  public hiddenoptionKW: boolean;
  public hiddenoptionTM: boolean;
  public ngramSelected: number;
  public listaConteudos: Array<string>;
  public optio: any;
  public dataset: any;
  public datasetFixed: any;
  public datasetFixed2: any;
  public datasetRelOnly: any;
  public numberOfKeyWords: number;
  public contextWindow: any;
  public simbaValue: number;
  public cheating: boolean;
  public showOnlyRel: boolean;
  public showOnlyRelSnap: boolean;
  public differentValues: Array<any>;
  public differentRelValues: Array<any>;
  public contextFullSentence: boolean;
  public simbaValueMax: boolean;
  public TH: number;
  public exe_time_total: string;
  public exe_time_YAKE: string;
  public exe_time_algo: string;
  public exe_time_GTE: string;
  public numero_total: number;
  public numero_total2: number;
  public right: string;
  constructor(
    private yake: YakeService,
    private timeline: TimelineService,
    private _snackBar: MatSnackBar,
    private _lang: LangdetectService
  ) {
    /*private timeline: TimelineService*/
    this.ngramSelected = 1;
    this.right = "right";
    this.byDocOrSentece = true;
    this.result = "";
    this.differentRelValues = [];
    this.differentValues = [];
    this.requestMade = false;
    this.withKeywords = true;
    this.withKeywordsSentence = "Keywords Off";
    this.hiddenoption = false;
    this.hiddenoptionKW = false;
    this.hiddenoptionTM = false;
    this.loading = false;
    this.contextFullSentence = true;
    this.simbaValueMax = true;
    // tslint:disable-next-line: max-line-length
    this.listaConteudos = [
      "2011 Haiti Earthquake Anniversary. As of 2010 (see 1500 photos here), the following major earthquakes have been recorded in Haiti. The first great earthquake mentioned in histories of Haiti occurred in 1564 in what was still the Spanish colony. It destroyed Concepción de la Vega. On January 12, 2010, a massive earthquake struck the nation of Haiti, causing catastrophic damage inside and around the capital city of Port-au-Prince. On the first anniversary of the earthquake, 12 January 2011, Haitian Prime Minister Jean-Max Bellerive said the death toll from the quake in 2010 was more than 316,000, raising the figures in 2010 from previous estimates. I immediately flashed back to the afternoon of February 11, 1975 when, on my car radio, I first heard the news. Yesterday...",
      `Pour ces nombreux accomplissements ainsi que son remarquable engagement  dans le projet européen, Helmut Kohl a reçu en 1998, la prestigieuse distinction de citoyen d'honneur de l'Europe, par le Conseil Européen de Vienne.

    Cette distinction européenne est l'une des plus honorifiques car elle est décernée au nom de toute l'Union Européenne pour récompenser l'investissement des personnalités qui ont permis de mener à bien le projet européen. Seul 2 autres personnes ont été distinguées par cette décoration: Jean Monnet en 1976 et Jacques Delors en 2015.
    `,
      `Champions: le possibili avversarie ai Quarti.  Conclusi gli Ottavi di finale, è ora definito il quadro delle otto "grandi d'Europa" che si sfideranno nei Quarti di Champions League 2016/2017. L'appuntamento con l'urna di Nyon è per oggi, venerdì 17 marzo, alle ore 12, con la Juventus che se la vedrà con una tra le tre formazioni spagnole (Atlético Madrid, Barcellona e Real Madrid); i tedeschi di Bayern Monaco e Borussia Dortmund; gli inglesi del Leicester o i transalpini del Monaco. A questo riguardo, andiamo ad analizzare alcune statistiche e curiosità relative ai precedenti tra i Bianconeri e i possibili avversari nei Quarti di finale.`,
      `Entre tantos acontecimentos marcantes de 2016, um dos que mais impactaram o país e o Congresso Nacional foi o  impeachment da presidente Dilma Rousseff. O processo caracterizou-se por polêmica e divergência de opiniões no Parlamento e na sociedade, o que o diferencia do ocorrido com Fernando Collor, em 1992.
    Os casos de impeachment de Dilma e Collor podem ser caracterizados por momento de crise econômica e baixa popularidade dos presidentes. Dilma, no início, contava com ampla base aliada do Congresso, o que foi diminuindo ao longo do julgamento. Já Collor governou com baixo apoio parlamentar. Dilma teve forte apoio de movimentos sociais e de organizações sindicais, como a Central Única dos Trabalhadores (CUT), que organizou manifestações contrárias ao impedimento. Na época de Collor, movimentos e entidades da sociedade foram favoráveis à queda do presidente.
    O processo de impeachment de Dilma Rousseff teve início em 2 de dezembro de 2015, quando o ex-presidente da Câmara dos Deputados Eduardo Cunha deu prosseguimento ao pedido dos juristas Hélio Bicudo, Miguel Reale Júnior e Janaína Paschoal. Com uma duração de 273 dias, o caso se encerrou em 31 de agosto de 2016, tendo como resultado a cassação do mandato, mas sem a perda dos direitos políticos de Dilma.
    Na justificação para o pedido de impeachment, os juristas alegaram que a então presidente havia cometido crime de responsabilidade pela prática das chamadas "pedaladas fiscais" e pela edição de decretos de abertura de crédito sem a autorização do Congresso.
    A acusação argumentou que os decretos autorizaram suplementação do orçamento em mais de R$ 95 bilhões e contribuíram para o descumprimento da meta fiscal de 2015. Disseram que o governo sabia da irregularidade porque já havia pedido revisão da meta quando editou os decretos e que o Legislativo não tinha sido consultado, como deveria ter sido feito antes da nova meta ser aprovada.
    Em relação às pedaladas, a acusação disse que não foram apenas atrasos operacionais porque o débito do Tesouro com os bancos públicos se acumulou por longo tempo e chegou a valores muito altos. Segundo os juristas, o acúmulo dos débitos serviu para fabricar superavit fiscal que não existia e para criar uma situação positiva das contas públicas que não era verdadeira. O objetivo das "pedaladas", como afirmaram, teria sido, portanto, esconder a real situação fiscal do país.
    A defesa, por sua vez, afirmou que os decretos de crédito suplementar foram baseados em remanejamento de recursos, excesso de arrecadação ou superavit financeiro, ou seja, não significaram aumento de despesa. Para os defensores de Dilma, os atrasos no pagamento da equalização de taxas de juros do Plano Safra não podiam ser considerados empréstimos porque o dinheiro é emprestado aos agricultores e não ao governo
    `,
      `The Boston Marathon bombing was a terrorist attack, followed by subsequent related shootings, that occurred when two pressure cooker bombs exploded during the Boston Marathon on April 15, 2013. The bombs exploded about 12 seconds and 210 yards (190 m) apart at 2:49 pm EDT, near the marathon's finish line on Boylston Street. The explosion killed 3 civilians and injured an estimated 264 others.
    The Federal Bureau of Investigation (FBI) took over the investigation and, on April 18, released photographs and a surveillance video of two suspects. The suspects were identified later that day as Chechen brothers Dzhokhar Tsarnaev and Tamerlan Tsarnaev. Shortly after the FBI released identifying images publicly, the suspects killed an MIT policeman, carjacked a civilian SUV, and initiated an exchange of gunfire with the police in nearby Watertown. During the firefight, a Massachusetts Bay Transportation Authority Police officer was injured but survived with severe blood loss. A Boston Police Department officer was also injured and died from his wounds nearly a year later. Tamerlan Tsarnaev was shot several times in the firefight and his brother subsequently ran him over with the stolen SUV in his escape. Tamerlan died shortly after arriving at Boston's Beth Israel Hospital.
    An unprecedented manhunt for Dzhokhar Tsarnaev ensued on April 19, with thousands of law enforcement officers searching a 20-block area of Watertown. During the manhunt, authorities asked residents of Watertown and surrounding areas, including Boston, to stay indoors. The public transportation system and most businesses and public institutions were shut down, creating a deserted urban environment of historic size and duration. Around 6:00 p.m., shortly after the "shelter-in-place" advisory was rescinded, a Watertown resident discovered Dzhokhar hiding in a boat in his back yard. Reports conflict as to whether or not he was armed. Located within the boat by thermal imaging, he was shot while in the boat, arrested, and then taken to a hospital shortly thereafter.
    During an initial interrogation in the hospital, Dzhokhar alleged that Tamerlan was the mastermind. He said they were motivated by extremist Islamist beliefs and the wars in Iraq and Afghanistan, and that they were self-radicalized and unconnected to any outside terrorist groups. According to him, they learned to build explosive devices from an online magazine of the al-Qaeda affiliate in Yemen. He said that he and his brother had decided after the Boston bombing to travel to New York City to bomb Times Square. Dzhokhar was indicted on April 22, while still in the hospital, on 30 charges relating to homegrown terrorism, including use of a weapon of mass destruction and malicious destruction of property resulting in death. He was found guilty on all charges on April 8, 2015, and the following month was sentenced to death.
    On Patriots' Day, April 15, 2013, the 117th annual Boston Marathon began without any signs of an imminent attack. Officials swept the area for bombs twice before the explosions; the second sweep occurred one hour before the bombs went off. People were able to come and go freely and carry bags and items in and out of the area.
    At 2:49 pm EDT (18:49 UTC), nearly three hours after the winner crossed the finish line, but with more than 5,700 runners yet to finish, two bombs detonated on Boylston Street near Copley Square about 210 yards (190 m) apart, just before the finish line. The first exploded outside Marathon Sports at 671–673 Boylston Street at 2:49:43 pm EDT. At the time of the first explosion, the race clock at the finish line showed 04:09:43, reflecting the elapsed time since the Wave 3 start at 10:40 am EDT. The second bomb exploded at 2:49:57 pm EDT, about 13 seconds later and one block farther west at 755 Boylston Street.
    The blasts blew out windows on adjacent buildings but did not cause any structural damage. Some runners continued to cross the line until 2:57 pm EDT, 8 minutes after the explosions.
    Rescue workers and medical personnel, on hand to assist runners and bystanders, rushed available aid to wounded victims in the bombing's immediate aftermath. Additional emergency units from Boston EMS, the Boston Police Department, and the Boston Fire Department were dispatched to assist emergency responders already on-scene. A mutual aid request was sent and additional private ambulances responded. The explosions killed 3 civilians and injured an estimated 264 others, who were treated in 27 local hospitals. At least 14 people required amputations, with some suffering traumatic amputations as a direct result of the blasts.
    The marathon was halted abruptly. Boston Police, following emergency plans, diverted the remaining runners away from the finish line to Boston Common and Kenmore Square. The nearby Lenox Hotel and other buildings were evacuated. Police closed down a 15-block area around the blast site; this was reduced to a 12-block crime scene on April 16. Massachusetts Army National Guard soldiers already at the scene joined local authorities in rendering aid. Boston police commissioner Edward F. Davis recommended that people stay off the streets.
    Many civilians dropped backpacks and other bags as they fled, requiring each to be treated as a potential bomb. A number of news reports stated that more bombs had been found nearby and the Boston Police Bomb Squad said they would perform a controlled explosion on the 600 block of Boylston Street, but in the end no other bombs were found. Some media outlets also reported a potential bombing at the John F. Kennedy Presidential Library in the Dorchester section of the city, but this turned out to be an unrelated electrical fire. The Navy sent one of its EOD (Explosive Ordinance Disposal) to Boston to help local authorities.
    As a precaution, the Federal Aviation Administration restricted airspace over Boston, and issued a temporary ground stop for Boston's Logan International Airport. Some Massachusetts Bay Transportation Authority service was halted. Several cities in Massachusetts and other states put their police forces on alert. U.S. Attorney General Eric Holder directed that the "full resources" of the U.S. Department of Justice be brought to bear on investigating the explosions.
    The Massachusetts Emergency Management Agency suggested people trying to contact those in the vicinity use text messaging instead of voice calls because of crowded cellphone lines. Cellphone service in Boston was congested but remained in operation, despite some local media reports stating that cell service was shut down to prevent cell phones from being used as detonators.
    The American Red Cross helped concerned friends and family receive information about runners and casualties. The Boston Police Department also set up a helpline for people concerned about relatives or acquaintances to contact and a line for people to provide information. Google Person Finder activated their disaster service under Boston Marathon Explosions to log known information about missing persons as a publicly viewable file
    Because of the closure of several hotels near the blast zone, some out-of-town visitors were left with nowhere to stay; many Boston-area residents opened their homes to them.
    The Federal Bureau of Investigation led the investigation, assisted by the Bureau of Alcohol, Tobacco, Firearms and Explosives, the Central Intelligence Agency, the National Counterterrorism Center, and the Drug Enforcement Administration, and named two official suspects.
    United States government officials stated that there had been no intelligence reports that indicated such a bombing would take place. Representative Peter King, a member of the House Intelligence Committee, said: "I received two top secret briefings last week on the current threat levels in the United States, and there was no evidence of this at all."
    Following the identification of the suspects, their father claimed that the FBI had been watching his family and questioned his sons in Cambridge, Massachusetts, five times in relation to possible explosions on the streets of Boston.
    At the site of the explosion, investigators found shrapnel that included bits of metal, nails, and bearing balls, as well as black nylon pieces from a backpack. The lid of a pressure cooker was found on a nearby rooftop. Investigators also found the remains of an electronic circuit board and wiring. All evidence was sent to the FBI Laboratory for analysis. Both of the improvised explosive devices were pressure cooker bombs, manufactured by the bombers. Authorities reportedly confirmed that the brothers used bomb making instructions found in Al Qaeda in the Arabian Peninsula's Inspire. After the suspects were identified, The Boston Globe reported that Tamerlan purchased fireworks from a fireworks store in New Hampshire.
    On April 19, the FBI, West New York Police Department, and Hudson County Sheriff's Department seized computer equipment from the suspects' sister's apartment located in West New York, New Jersey.
    On April 24, the FBI and the Department of Homeland Security released a joint intelligence bulletin which the Los Angeles Times reports to include the "preliminary analysis of recovered evidence, [for] each device". The report says investigators believe that the two homemade bombs used were triggered by long-range remote controls used for toy cars; and that investigators have finished a preliminary reconstruction of the bombs that were used during the April 15 attacks.
    In a news conference held at 5:20 pm on April 18, the FBI released photographs and surveillance videos showing two suspects—each carrying a backpack, and walking one behind the other—and sought the public's help in identifying them. The FBI released the photos, in part, to limit the damage by those wrongly targeted by incorrect news reports and social media speculations. Authorities later said that releasing the suspects' photos "was a turning point in the investigation, no doubt about it."
    Jeff Bauman, a victim who lost both legs, was adjacent to the location of one of the bombs; upon recovering consciousness, he asked for pen and paper and wrote a note to the FBI, "bag, saw the guy, looked right at me". Bauman was later able to provide detailed descriptions to the authorities of a suspect who was seen placing a backpack beside him at the bombing scene two and a half minutes before it exploded, enabling the photo to be identified and circulated quickly.
    The suspects, initially identified by the FBI as unnamed suspects 1 and 2 (or "black hat" and "white hat", respectively) from photographic and video evidence, had "acted differently" after the explosions; they had stayed to watch the aftermath and walked away "casually", rather than fleeing. Asked for assistance in identifying the suspects, the public provided a deluge of photographs and home movie records to police, which were scrutinized by both authorities and online public social networks.
    Despite video footage taken at the scene, the suspects were not identified by authorities before killing a police officer and hijacking a civilian vehicle. The source of identification was RMV records on the Honda vehicle, which was used in a subsequent kidnapping and then abandoned. The suspects were then identified as two brothers whose family had immigrated to the United States as asylees around 2002: 26-year-old Tamerlan Tsarnaev  and 19-year-old Dzhokhar Tsarnaev.
    A few hours after the photos were released, the suspects shot Sean A. Collier of the Massachusetts Institute of Technology Police Department six times, killing him for his gun, which they could not get out because of the holster's retention system. Collier, aged 27, was seated in his police car near the Stata Center (Building 32), on the Massachusetts Institute of Technology campus. He was taken to Massachusetts General Hospital in nearby downtown Boston, where he was pronounced dead. Some law enforcement officials described the killing as an assassination.
    The duo then carjacked a Mercedes-Benz M-Class SUV in the Allston-Brighton neighborhood of Boston; Tamerlan took the owner hostage and told him that he was responsible for the Boston bombing and for killing a police officer. Dzhokhar followed them in the green Honda, later joining them in the Mercedes-Benz. Interrogation later allegedly revealed that the brothers "decided spontaneously" that they wanted to go to New York and bomb Times Square.
    The suspects forced the hostage to use his ATM cards to obtain $800 in cash until the daily cash withdrawal limit was reached. They transferred objects to the Mercedes-Benz and one brother followed it in their Honda Civic, for which an all-points bulletin was issued. The car's owner, a Chinese national named Dun Meng (referred to only as "Danny" in early reports), escaped while the suspects stopped at a gas station; he ran across the street to another gas station, asking the clerk to call 911. His cellphone remained in the vehicle, allowing the police to focus their search on Watertown.
    Shortly after midnight on April 19, a Watertown police officer, Joseph Reynolds, identified the brothers in a Honda Civic and the stolen SUV. A gunfight followed on the 100 block of Laurel St, between the brothers and police arriving at the scene. An estimated 200 to 300 rounds of ammunition were fired and at least one further bomb and several "crude grenades" were thrown.
    According to Watertown Police Chief Edward Deveau, the brothers had an "arsenal of guns." The older brother, Tamerlan, ran out of ammunition and threw his empty pistol at Sergeant Jeffrey Pugliese, who tackled him with assistance from Sergeant John MacLellan. The younger brother Dzhokhar then drove the stolen SUV toward police and Tamerlan; Pugliese attempted to drag Tamerlan to safety at danger of his own life, but was unsuccessful. Dzhokhar ran over his brother, dragging him a short distance down the street. Dzhokhar Tsarnaev sped off, but about a half-mile away at the corner of Spruce and Lincoln streets he abandoned the car and escaped on foot.
    Upon searching the scene, only one firearm, a Ruger 9 mm pistol with a defaced serial number, was recovered. Within a 10-minute span, officers fired many rounds, peppering the area and leaving over a dozen nearby houses with scores of bullet holes. Tamerlan Tsarnaev was transported to Beth Israel Deaconess Medical Center, where he was pronounced dead on April 19 at 1:35 a.m.
    According to the death certificate, Tsarnaev's cause of death was "gunshot wounds of torso and extremities, blunt trauma to head and torso," and "shot by police then run over and dragged by motor vehicle." The death was ruled a homicide.
    During the firefight, 33-year-old MBTA Police Officer Richard H. Donohue Jr. was also critically wounded by what may have been friendly fire. He was taken to Mount Auburn Hospital with a bullet wound to the thigh and life-threatening blood loss, but he survived. Boston Police Department officer Dennis Simmonds died on April 10, 2014, as a result of injuries he sustained from a hand grenade at the Watertown shootout, bringing the total number of fatalities to five. Fifteen other police officers sustained minor injuries during the firefight,. A 50-page report on the manhunt produced by Harvard Kennedy School's Program on Crisis Leadership found that a lack of coordination between the police agencies involved put the public at excessive risk during the shootout.
    The FBI released additional photos of the two during the Watertown incident. Early on April 19, Watertown residents received reverse 911 calls asking them to stay indoors. On the morning of April 19, Governor Patrick asked residents of Watertown and adjacent cities and towns (Allston-Brighton, Boston, Belmont, Brookline, Cambridge, Newton, and Waltham) to "shelter in place". Somerville residents also received a reverse-911 call with orders to shelter in place.
    A 20-block area of Watertown was cordoned off and residents were told not to leave their homes or answer the door as officers in tactical gear scoured the area. Helicopters circled the area and SWAT teams in armored vehicles moved through in formation, with officers going door-to-door. On the scene were the FBI, the Bureau of Alcohol, Tobacco, Firearms and Explosives, the Department of Homeland Security, the National Guard, the Boston and Watertown Police departments and the Massachusetts State Police. The show of force was the first major field test of the interagency task forces created in the wake of the September 11 attacks.
    The entire public transit network, as well as most Boston taxi service, was suspended, as was Amtrak service to and from Boston. Logan International Airport remained open under heightened security. Universities, schools, many businesses, and other facilities were closed as thousands of law enforcement personnel participated in an unprecedented door-to-door manhunt in Watertown, as well as following up other leads, including at the house the brothers shared in Cambridge. Seven improvised explosive devices were recovered by bomb squads.
    The father of the Boston Marathon bombers, speaking from his home in Makhachkala, Dagestan, encouraged his son to: "Give up. Give up. You have a bright future ahead of you. Come home to Russia." He continued, "If they killed him, then all hell would break loose." On television, Dzhokhar's uncle from Montgomery Village, Maryland, pleaded with him to turn himself in.
    The manhunt ended on the evening of April 19, two hours after the shelter-in-place order had been lifted. Outside the search area, a Watertown resident stepped outside and noticed that the cover on his boat in his back yard was loose. He looked into the boat and saw a body lying in a pool of blood, and he promptly notified police. Authorities surrounded the boat and verified movement through a forward looking infrared thermal imaging device in a State Police helicopter. When the suspect started poking at the tarp of the boat, police began a large volume of gunfire at the boat, stopping only after the Superintendent on the scene called for a cease fire. Celebrations followed law enforcement's capture of Tsarnaev.
    According to Boston Police Commissioner Ed Davis, and Watertown Police Chief Deveau, Tsarnaev was shooting from inside the boat at police, "exchanging fire for an hour." After he was captured, Tsarnaev was found not to have any weapons. He was taken into custody at 8:42 pm and transported to Beth Israel Deaconess Medical Center, where he was listed in critical condition with multiple gunshot wounds to the head, neck, legs and hand. Initial reports that the neck wound was from a self-inflicted gunshot from a possible suicide attempt were later contradicted by the revelation that he was unarmed at the time of capture and a description of the neck wound by SWAT team members that the neck wound was a slicing injury, possibly caused by shrapnel from an explosion.
    United States Senators Kelly Ayotte, Saxby Chambliss, Lindsey Graham, and John McCain, and Representative Peter T. King, suggested that Dzhokhar Tsarnaev, a U.S. citizen, should be tried as an unlawful enemy combatant rather than as a criminal, potentially preventing him from obtaining legal counsel. Other sources, including Alan Dershowitz, a prominent American legal scholar and lawyer, said that doing so would be illegal and would jeopardize the prosecution. The government decided to try Dzhokhar in the federal criminal court system and not as an enemy combatant.
    Dzhokhar was questioned for 16 hours by investigators but stopped communicating with them on the night of April 22 after Judge Marianne Bowler read him a Miranda warning. Dzhokhar had not previously been given a Miranda warning, as federal law enforcement officials invoked the warning's public safety exception. This raised doubts whether the suspect's statements during this investigation would be admissible as evidence and led to a debate surrounding Miranda rights.
    On April 22, 2013, formal criminal charges were brought against Tsarnaev in the United States District Court for the District of Massachusetts during a bedside hearing while he was hospitalized. He was charged with use of a weapon of mass destruction, and with malicious destruction of property resulting in death. Some of the charges carry potential sentences of life imprisonment or the death penalty. Tsarnaev was judged to be awake, mentally competent, and lucid, and he responded to most questions by nodding. When the judge asked him whether he was able to afford an attorney, he responded "no"; he was represented by the Federal Public Defender's office. On April 26, Dzhohkar Tsarnaev was moved from Beth Israel Deaconess Medical Center to the Federal Medical Center at Fort Devens, about 40 miles (64 km) from Boston. FMC Devens is a federal prison medical facility at a former Army base where he was held in solitary confinement at a segregated housing unit with 23-hour-per-day lockdown.
    On July 10, 2013, Tsarnaev pleaded not guilty to 30 charges in his first public court appearance, including a murder charge for MIT police officer Sean Collier. He was back in court for a status hearing on September 23, and his lawyers requested more time to prepare their defense. On October 2, Tsarnaev's attorneys asked the court to lift the special administrative measures (SAMs) imposed by Attorney General Holder in August, saying the measures had left Tsarnaev unduly isolated from communication with his family and lawyers, and that no evidence suggests he poses a future threat.
    Judge George O'Toole ruled on September 24, 2014, that the trial would begin on January 5, 2015, two months later than planned, due to the extensive amount of evidence needed to be examined by both sides. He said the defense motion for a lengthier delay, until September 2015, was not warranted. He also ruled that the defense had failed to demonstrate that media coverage had "so inflamed and pervasively prejudiced the [potential area jury] pool that a fair and impartial jury could not be empaneled in the district", refusing their request for a change of venue to Washington, D.C. On December 18, 2014, Tsarnaev attended a pre-trial hearing, his first time in public since July 2013.
    The jury selection began on January 5, 2015, with an initial pool of 1373 prospective jurors filling out questionnaires. On February 25, Judge George O'Toole, along with the prosecution and defense teams, settled on a pool of 70 jury prospects after questioning 256 people over 21 days of individual interviews. On March 3, 2015, the jury, composed of eight men and 10 women (six of which were alternates), was selected. The trial began in federal court in Boston on March 4, 2015, with opening statements. Assistant U.S. Attorney William Weinreb, speaking for the prosecution, vividly described the scene of the bombing and attempted to paint Dzhokhar as "a soldier in a holy war against Americans" whose motive was "reaching paradise", and that he acted as an equal participant.
    Defense attorney Judy Clarke declared in her opening statement that "It was him"—that it was Dzhokhar Tsarnaev who had placed the second bomb at the finish line and was present at the murder of Sean Collier, at the carjacking of Dun Meng, and at the Watertown shootout, but she then laid out an argument aimed at saving Tsarnaev from the death penalty by showing the influence that his older brother had and that Dzhokhar was merely a follower. Between March 4 and 30, prosecutors called more than 90 witnesses over 15 days of testimony, including bombing survivors who described losing limbs in the attack, and the government rested its case on March 30. On March 31, after calling four witnesses overall, the defense team representing Tsarnaev finished presenting its case in the guilt phase.
    Following closing statements on April 6, Tsarnaev was found guilty on all 30 counts as the verdict was reached on April 8, 2015. It took 26 minutes to read the verdict that included convictions on weapons, bombing, conspiracy, and murder charges. Of the 30 counts, 17 carry the possibility of the death penalty. The sentencing phase of the trial was on April 21.
    On June 24, 2015, Tsarnaev was formally sentenced to death after he apologized to the victims for the bombings.
    According to FBI interrogators, Dzhokhar and his brother were motivated by extremist Islamic beliefs, but "were not connected to any known terrorist groups"; instead learning to build explosive weapons from an online magazine published by al-Qaeda affiliates in Yemen. They further alleged that "[Dzhokhar and] his brother considered suicide attacks and striking on the Fourth of July; but ultimately decided to use pressure cooker bombs (capable of remote detonation) and other IEDs." Fox News reported that the brothers "chose the prestigious race as a 'target of opportunity' ... [after] the building of the bombs came together more quickly than expected".
    Dzhokhar said he and his brother wanted to defend Islam from the U.S., which conducted the Iraq War and War in Afghanistan, in the view of the brothers, against Muslims. Later a CBS report revealed that a note scrawled by Dzhokhar with a marker on the interior wall of the boat where he was hiding said the bombing were "retribution for U.S. military action in Afghanistan and Iraq", and called the Boston victims "collateral damage", "in the same way innocent victims have been collateral damage in U.S. wars around the world." According to The New York Times, the portion of the boat's interior with the note would likely be cut from the hull with permission from the owner and presented in court as evidence.
    Despite the seemingly outwardly religious motivation of the Tsarnaev brothers, some political science and public policy scholars suggest that Islam may have played only a secondary role in the attacks. Sympathy towards the political aspirations in the Caucasus region and Tamerlan's inability to become fully integrated into American society appear to be the primary motives, in their opinion. According to The Los Angeles Times, a law enforcement official said Dzhokhar "did not seem as bothered about America's role in the Muslim world" as his brother Tamerlan had been. Dzhokhar identified Tamerlan as the "driving force" behind the bombing, and said that his brother had only recently recruited him to help.
    Tamerlan Tsarnaev was born in 1986 in the Kalmyk Autonomous Soviet Socialist Republic, North Caucasus. Dzhokhar was born in 1993 in Kyrgyzstan, although some reports say his family claims he was born in Dagestan. The family spent time in Tokmok, Kyrgyzstan, and in Makhachkala, Dagestan. They are half Chechen through their father, Anzor, and half Avar through their mother, Zubeidat. Although they never lived in Chechnya, the brothers self-identified as Chechen.
    The Tsarnaev family emigrated in 2002 to the United States, where they applied for political asylum, settling in Cambridge, Massachusetts. Tamerlan Tsarnaev attended Bunker Hill Community College but dropped out to become a boxer. His goal was a place on the U.S. Olympic boxing team saying that "unless his native Chechnya becomes independent" he would "rather compete for the United States than for Russia". He was married on July 15, 2010, in the Masjid Al Quran Mosque in the Dorchester section of the city, to a U.S. citizen, Katherine Russell, who was pregnant with their daughter. He stated that he "didn't understand" Americans and had not a single American friend. He had a history of violence, including an arrest in July 2009 for assaulting his then-girlfriend.
    The brothers are Muslim, with Tamerlan's aunt stating that he had recently become a devout Muslim. Tamerlan, since 2009, became more devout and religious, and a YouTube channel in his name linked to Salafist and Islamist videos. The FBI was informed by the Russian Federal Security Service (FSB) in 2011 that he was a "follower of radical Islam." In response, the FBI interviewed Tamerlan and his family, and searched databases, but did not find any evidence of "terrorism activity, domestic or foreign." During the 2012 trip to Dagestan, Tamerlan was reportedly a frequent visitor at a mosque on Kotrova Street in Makhachkala, believed by the FSB to be linked with radical Islam. Some experts believe "they were motivated by their faith, apparently an anti-American, radical version of Islam" acquired in the U.S., while others believe the turn to radicalism happened in Dagestan.
    At the time of the bombing, Dzhokhar Tsarnaev was a student at the University of Massachusetts Dartmouth, with a major in marine biology. Dzhokhar became a naturalized U.S. citizen on September 11, 2012. Tamerlan's boxing coach reported to NBC that the young brother was greatly affected by his brother and admired him.
    Tamerlan Tsarnaev was previously connected, but at the time not a suspect, to the triple homicide in Waltham, Massachusetts, on the evening of September 11, 2011. Brendan Mess, Erik Weissman and Raphael Teken were murdered in Mess's apartment. All had their throats slit from ear to ear, with such great force that they were nearly decapitated. The local district attorney said that it appeared that the killer and the victims knew each other, and that the murders were not random. Tamerlan Tsarnaev had previously described murder victim Brendan Mess as his "best friend." After the bombing and subsequent revelations of Tsarnaev's personal life, the Waltham murders case was reexamined in April 2013 with Tsarnaev as a new suspect. Both ABC and The New York Times have reported that there is strong evidence that implicates Tsarnaev in this triple homicide.
    Some analysts claim the Tsarnaev brothers' mother, Zubeidat Tsarnaeva, is a radical extremist and supporter of jihad, who influenced her sons' behavior. This prompted the Russian government to warn the U.S. government about the family's behavior, on two occasions. Both Tamerlan and his mother were placed on a terrorism watch list about 18 months before the bombing took place.
    According to a Wall Street Journal report citing statements by anonymous U.S. officials, Russia denied U.S. requests for more information after its initial warning.
    Other arrests, detentions, and prosecutions
    On April 15, several people who were near the scene of the blast were taken into custody and questioned about the bombing, including a Saudi man whom police stopped as he was walking away from the explosion, and detained when some of his responses to questions "made them uncomfortable." Law enforcement searched his residence in a Boston suburb. The man was found to have no connection to the attack; an unnamed U.S. official said, "he was just at the wrong place at the wrong time."
    On the night of April 18, two men riding in a taxi in the vicinity of the shootout were arrested and released shortly thereafter when police determined they were not involved in the Marathon attacks. Another man was arrested several blocks from the site of the shootout and was forced to strip naked by police who feared he might have concealed explosives. He was released that evening after a brief investigation determined that he was an innocent bystander.
    On May 22, the FBI interrogated Ibragim Todashev, a Chechen from Boston, in Orlando, Florida. During the interrogation he was shot and killed by an FBI agent who claimed that Todashev attacked him. The New York Times quoted an unnamed law enforcement official as saying that Todashev had confessed to a triple homicide and implicated Tsarnaev as well. Todashev's father claims that his son is innocent and that federal investigators are biased against Chechens and made up their case against him.
    Robel Phillipos, 19, was a U.S. citizen of Ethiopian descent living in Cambridge, was arrested and faced charges of knowingly making false statements to police. He graduated from high school in 2011 with Dzhokhar Tsarnaev.
    Dias Kadyrbayev, 19, and Azamat Tazhayakov, 20, were Kazakhstan natives living in the U.S. They were Dzhokhar Tsarnaev's roommates in an off-campus housing complex at which Tsarnaev had sometimes stayed in New Bedford, Massachusetts.
    Phillipos, Kadyrbayev, Tazhayakov, and Tsarnaev entered the University of Massachusetts Dartmouth in the fall of 2011 and knew each other well. After seeing photos of the as-yet unidentified Tsarnaev on television, the three men traveled to Tsarnaev's dorm room, where they retrieved a backpack and laptop belonging to Tsarnaev. The backpack was discarded, but police recovered the backpack and contents in a nearby New Bedford landfill on April 26. During interviews, the men initially denied visiting the dorm room but later admitted their actions.
    During the night of April 18–19, Kadyrbayev and Tazhayakov were arrested by police at the off-campus housing complex. An unidentified girlfriend of one of the men was also arrested. All three were soon released.
    On April 20, Kadyrbayev and Tazhayakov were re-arrested in New Bedford, and held on immigration-related violations. On May 1, they appeared before a federal immigration judge and were charged with overstaying their student visas. That same day, Kadyrbayev and Tazhayakov were charged criminally with:
    willfully conspir(ing) with each other to commit an offense against the United States ... by knowingly destroying, concealing and covering up objects belonging to Dzhokhar Tsarnaev, namely, a backpack containing fireworks and a laptop computer, with the intent to impede, obstruct, and influence the criminal investigation of the Marathon bombing.
    On August 8, 2013, Kadyrbayev and Tazhayakov were indicted by a federal grand jury on charges of conspiracy to obstruct justice for helping Dzhokhar Tsarnaev dispose of a laptop computer, fireworks, and a backpack after the bombing. Each faced up to 25 years in prison, and deportation if convicted. On July 21, 2014, Tazhayakov was convicted of obstruction of justice and conspiracy.
    On August 22, 2014, Kadyrbayev pleaded guilty to obstruction charges. Sentencing was delayed pending the U.S. Supreme Court's ruling in Yates v. United States. In June 2015, Kadyrbayev was sentenced to six years in prison.
    Tazhayakov pleaded not guilty and went to trial, arguing that "Kadyrbayev was the mastermind behind destroying the evidence and that Tazhayakov only 'attempted obstruction.'" Jurors returned a guilty verdict against Tazhayakov, however, and in June 2015, Tazhayakov was sentenced to 42 months in prison, which equated to three and a half years. Judge Douglas Woodlock gave a lighter sentence to Tazahayakov than to Kadyrbayev, who was viewed as more culpable.
    Phillipos was arrested and faced charges of knowingly making false statements to police. He was released on $100,000 bail, and placed under house confinement with an ankle bracelet. On October 28, 2014, Phillipos was convicted on two charges of lying about being in Tsarnaev's dorm room. He later acknowledged he had been in that room while two other friends removed a backpack containing potential evidence relating to the bombing.
    Phillipos faced a maximum sentence of eight years' imprisonment on each count. In June 2015, U.S. District Judge Douglas P. Woodlock sentenced him to three years in prison. Phillipos has filed an appeal.
    On May 30, 2014, a federal indictment against Khairullozhon Matanov was unsealed, charging him with "one count of destroying, altering, and falsifying records, documents, and tangible objects in a federal investigation, specifically information on his computer, and three counts of making materially false, fictitious, and fraudulent statements in a federal terrorism investigation." Matanov bought dinner for the two Tsarnaev brothers forty minutes after the bombing. After the Tsarnaev brothers' photos were released to the public, Matanov viewed the photos on the CNN and FBI websites before attempting to reach Dzhokhar, and then tried to give away his cell phone and delete hundreds of documents from his computer. Prosecutors said that Matanov attempted to mislead investigators about the nature of his relationship with the brothers and to conceal that he shared the brothers' philosophy of violence.
    Matanov was originally from Kyrgyzstan, came to the U.S. in 2010 on a student visa, and later claimed asylum. He attended Quincy College for two years before dropping out to become a taxicab driver. He was living in Quincy, Massachusetts at the time of his arrest, and was a friend of Tamerlan Tsarnaev.
    In March 2015, Matanov pleaded guilty to all four counts. In June 2015, he was sentenced to 30 months in prison.
    Three civilians were killed in the bombing: Krystle Marie Campbell, 29, a restaurant manager from Medford, Massachusetts; Lu Lingzi 23, a Chinese national and Boston University graduate student from Shenyang, Liaoning; and Martin William Richard, an eight-year-old boy from the Dorchester neighborhood of Boston, who was killed by the second bomb.
    On April 18, at about 10:48 pm, Sean A. Collier, 27, an MIT police officer (formerly with the Somerville Auxiliary Police Department from 2006 to 2009) of Wilmington, Massachusetts, living in Somerville, Massachusetts, was ambushed in his police car and died from multiple gunshot wounds from the bombing suspects. Boston Police Department officer Dennis Simmonds died on April 10, 2014, as a result of injuries he sustained from a hand grenade at the Watertown shootout.
    According to the Boston Public Health Commission, 264 civilians were treated at 27 local hospitals. Eleven days later, 29 remained hospitalized, one in critical condition. Many victims had lower leg injuries and shrapnel wounds, which indicated the devices were low to the ground. At least sixteen civilians lost limbs, at the scene or by amputation in a hospital, and three lost more than one limb.
    Doctors described removing "ball-bearing type" metallic beads a little larger than BBs, and small carpenter-type nails about 1 to 2.5 centimeters (0.4 to 1 in) long. Similar objects were found at the scene. The New York Times cited doctors as saying because the bombs were low to the ground, they mainly injured legs, ankles and feet instead of fatally injuring abdomens, chests, shoulders and heads. Some victims had perforated eardrums.
    During a firefight with the suspects just after midnight on April 19, 33-year-old MBTA police officer Richard H. Donohue Jr. was critically wounded. He lost almost all of his blood, and his heart stopped for 45 minutes, during which time he was kept alive by cardiopulmonary resuscitation. The Boston Globe reported that Donohue may have been accidentally shot by a fellow officer.
    Marc Fucarile, who lost his right leg and received severe burns and shrapnel wounds, was the last victim released from hospital care, on July 24, 2013.
    Law enforcement, local and national politicians, and various heads of state reacted quickly to the bombing, generally condemning the act and expressing sympathies for the victims.
    The One Fund Boston, established by Massachusetts Governor Deval Patrick and Boston mayor Thomas Menino and administered by attorney Kenneth Feinberg, expects to make distributions to bombing victims by June 30. "In my 20 years as mayor, I've never seen the business community come together so quickly," said Mayor Menino. A week after the bombing, crowdfunding websites, such as GoFundMe, GiveForward, FundRazr, YouCaring and Fundly, received more than 23,000 pledges promising more than $2 million for the victims, their families, and others affected by the bombing. On May 30, 2013 the Boston Strong concert at the TD Garden in Boston benefitted the One Fund. The concert featured Aerosmith, James Taylor, Boston, J. Geils Band, Dropkick Murphys, New Kids on the Block, Bell Biv DeVoe, Boyz II Men, Jimmy Buffett, Carole King, Extreme, Buffalo Springfield, The Monkees, Neil Young, and Jason Aldean.
    The Israel Trauma Coalition for Response and Preparedness sent six psychologists and specialists from Israel to help Boston emergency responder, government administrators, and community stakeholders develop post-terrorist attack recovery strategies.
    Following a $212,000 donation from Health Bridge Management on September 12, 2013, the One Fund Boston had received more than $69.8 million in donations.
    As a safety precaution, the NHL postponed a Boston Bruins home game against the Ottawa Senators at TD Garden scheduled for April 15, to April 28 instead. The Boston Symphony Orchestra canceled its performance of April 15. On April 16, the MBTA public transit system, which was partly shut down, was under heavy National Guard and police presence and it was shut down a second time April 19 during the manhunt. The NBA's Boston Celtics game scheduled for April 16 against the Indiana Pacers was canceled since both teams' playoff seedings were already set. The Boston Red Sox game at Fenway, the Bruins game, and the Big Apple Circus performance scheduled for April 19, were postponed to support efforts of law enforcement officers. The NCAA announced on April 19 that the 2013 NCAA Men's Division III Volleyball Championship, scheduled for April 26–28 at the MIT campus in Cambridge, would be moved to Nazareth College in the Rochester, New York area.
    In the days after the bombing, makeshift memorials began to spring up all along the cordoned off area surrounding Boylston Street. The largest was initially located on Arlington Street, the easternmost edge of the barricades. Starting with flowers, tokens and T-shirts, the makeshift memorial at Arlington Street quickly expanded prior to the move of the easternmost edge of the barricade westward from Arlington Street to Berkeley Street, as well as the move of the memorial from Arlington Street to Berkeley Street. The growth of the memorial at Berkeley Street was rapid over the proceeding days starting with a small pile of assorted mementos on April 17, 2013, and growing to a substantial shrine on April 18, 2013. By April 19, 2013, the memorial was beginning to swell outwards toward Berkeley Street itself. With the reopening of Copley Square to the Public, the memorials along the boundaries of Boylston street, including the largest one at Berkeley Street, were consolidated and moved into Copley Square. In June the Makeshift Memorial located in Copley Square was taken down and the memorial objects located there were moved to the archives in West Roxbury for cleaning, fumigation, and archiving.
    Boston University established a scholarship in honor of Lü Lingzi, a student who died in the bombing. MIT also established a scholarship and erected a sculpture (unveiled on April 29, 2015), both in memory of MIT Police officer Sean Collier.
    On April 26, 2013, the Celtics honored the bombing victims and first responders before their playoff game against the Knicks at home in the TD Garden. The Bruins' home playoff games held tributes to the Marathon bombing victims and first responders before the opening face-off. After the Chicago Blackhawks defeated the Bruins in the 2013 Stanley Cup Finals, the Blackhawks took out a full-page ad in the Boston Globe thanking the city of Boston for respect and sportsmanship during the Cup Finals and praising their recovery from the bombing. On September 12, the New England Patriots honored 25 first responders with special jerseys in a ceremony before their opening home game against the New York Jets at Gillette Stadium in Foxborough. After the Red Sox won the 2013 World Series, the team used their celebratory parade on November 2, 2013, to honor the victims of the bombing at a dedication on the marathon finish line, a move considered to help the city "reclaim" its spirit that was lost after the bombing.
    A couple, Christian Williams and Caroline Reinsch, who both had sustained injuries in the bombing, and who had learned they were expecting while in hospital, had a daughter on December 18, 2013.
    President Barack Obama addressed the nation after the attack. He said that, although the perpetrator(s) were still unknown, the government would "get to the bottom of this" and that those responsible "will feel the full weight of justice". The President addressed the American people the next day, and later said, "Any time bombs are used to target innocent civilians, it is an act of terror." President Obama ordered flags to half-staff until April 20 on all federal buildings as "a mark of respect for the victims of the senseless acts of violence perpetrated on April 15, 2013, in Boston, Massachusetts." On April 18, President Obama addressed an interfaith service at the Cathedral of the Holy Cross in Boston to honor the victims of the attacks.
    Moments of silence were held at various events across the country, including at the openings of the New York Stock Exchange, NASDAQ, and NYMEX on the day after the bombing.
    A Boston Remembrance Run held in Portland, Oregon, on April 17, drew over 1,000 runners in a silent show of support. The Oklahoma City Memorial Marathon organizers asked runners, volunteers, and spectators to wear red socks. Marathon organizer Andrea Miles said, "As Oklahomans and folks participating in the OKC Memorial Marathon, we have such a deep connection to not only the marathon but the events from the Murrah bombing that have led to this memorial," Miles said. "So now we're not just running to remember the 168 people who were lost in 1995 but also to honor Boston and stand in solidarity with them.". The marathon in Lansing, MI was the first marathon ran in the United States after the bombing. The events featured a moment of silence led by Mayor Virg Benero in respect for those affected by the incidents in Boston. This was preceded by Benero joining a Michigan resident who, after stopping short of the finish in Boston due to the bombing, finished the remaining half-mile of the race in Lansing.
    On June 7, 2013, a cross-country relay, One Run for Boston, left Venice Beach, Los Angeles, California, for Boston. Organized by three Britons—Danny Bent, Kate Treleaven and James Hay—to support the Boston One Fund, the relay included more than 2,000 runners in 319 stages of 5 to 12 miles for a total of more than 3,000 miles in 14 states. The GPS baton carried to track the relay's progress crossed the Boston Marathon Finish Line around 1 am on July 1, 2013.
    The bombing was denounced and condolences were offered by many international leaders as well as leading figures from international sport. Security measures were increased worldwide in the wake of the attack.
    In China, users posted condolence messages on Weibo in response to the death of Lü Lingzi. Chris Buckley of The New York Times said "Ms. Lu's death gave a melancholy face to the attraction that America and its colleges exert over many young Chinese." Laurie Burkitt of The Wall Street Journal said "Ms. Lu's death resonates with many in China" due to the one-child policy.
    Organizers of the London Marathon, which was held six days after the Boston bombing, reviewed security arrangements for their event, despite there not being any threat against it. Hundreds of extra police officers were drafted in to provide a greater presence on the streets, but despite the security concerns a record 700,000 spectators lined the streets. Runners in London observed a 30-second silence in respect for the victims of Boston shortly before the race began, and many runners wore black ribbons on their vests. Organisers also pledged to donate US$3 to a fund for Boston Marathon victims for every person who finished the race.
    Organizers of the 2013 Vancouver Sun Run, which was held on April 21, 2013, donated $10 from every late entry for the race to help victims of the bombing at the Boston Marathon. Jamie Pitblado, vice-president of promotions for The Vancouver Sun and The Province, said the money would go to One Fund Boston, an official charity that's collecting donations for the victims and their families. Sun Run organizers raised anywhere from $25,000 to $40,000. There were over 48,000 participants, many dressed in blue and yellow (Boston colors) with others wearing Boston Red Sox caps.
    Petr Gandalovic, ambassador of the Czech Republic, released a statement after noticing much confusion on Facebook and Twitter between his nation and the Chechen Republic. "The Czech Republic and Chechnya are two very different entities – the Czech Republic is a Central European country; Chechnya is a part of the Russian Federation."
    Security was also stepped up in Singapore in response to online threats made on attacking several locations in the city-state and the Singapore Marathon in December. Two suspects were investigated and one was eventually arrested for making false bomb threats.
    The Russian government said special attention would be paid to security at upcoming international sports events in Russia, including the 2014 Winter Olympics. According to the Russian embassy in the U.S., President Vladimir Putin condemned the bombing as a "barbaric crime" and "stressed that the Russian Federation will be ready, if necessary, to assist in the U.S. authorities' investigation." He urged closer cooperation of security services with Western partners.
    Republican U.S. Senators Saxby Chambliss and Richard Burr reported that Russian authorities had separately asked both the FBI (at least twice: during March and November 2011) and the CIA (September 2011) to look carefully into Tamerlan Tsarnaev and provide more information about him back to Russia. Russian Federal Security Service (FSB) secretly recorded phone conversations between Tamerlan Tsarnaev and his mother Zubeidat Tsarnaeva (they vaguely and indirectly discussed jihad) and sent these to the FBI as evidence of possible extremist links within the family. However, while Russia offered US intelligence services warnings that Tsarnaev planned to link up with extremist groups abroad, an FBI investigation yielded no evidence to support those claims at the time. In addition, subsequent U.S. requests for additional information about Tsarnaev went unanswered by the Russians.
    But Russian authorities and mass media blame U.S. authorities for negligence because the authorities were warned by Russian counterparts several times long before the bombing happened. Moreover Russian authorities and mass media since the spring of 2014 blame USA for politically motivated false information about lack of response from Russian authorities after subsequent U.S. requests. As a proof a letter from Russian Federal Security Service (FSB) were shown to the members of U.S. Congressmen official delegation to Moscow during their visit. This letter with information about Tsarnaev (including his biography details, connections and phone number) had been sent from FSB to FBI and CIA during March 2011.
    On April 19, 2013, the press-secretary of the head of the Chechen Republic, Ramzan Kadyrov, issued a statement that, inter alia, read: "The Boston bombing suspects have nothing to do with Chechnya". On the same day, Kadyrov was reported by The Guardian to have written on Instagram:
    Any attempt to make a link between Chechnya and the Tsarnaevs, if they are guilty, is in vain. They grew up in the U.S., their views and beliefs were formed there. The roots of evil must be searched for in America. The whole world must battle with terrorism. We know this better than anyone. We wish recover to all the victims and share Americans' feeling of sorrow.
    Akhmed Zakayev, head of the secular wing of the Chechen separatist movement, now in exile in London, condemned the bombing as "terrorist" and expressed condolences to the families of the victims. Zakayev denied that the bombers were in any way representative of the Chechen people, saying that "the Chechen people never had and can not have any hostile feelings toward the United States and its citizens."
    The Mujahideen of the Caucasus Emirate Province of Dagestan, the Caucasian Islamist organization in both Chechnya and Dagestan, denied any link to the bombing or the Tsarnaev brothers and stated that it was at war with Russia, not the United States. It also said that it had sworn off violence against civilians since 2012.
    In the Turkistan Islamic Party's Turkestan Al-Islamiyya magazine, Issue 13, the Rohingya cleric Abu Dhar 'Azzam (Abu Dhar Al-Burmi) congratulated the Tsarnaev brothers on their terrorist attack in the Boston Marathon bombing, saying In the very house of unbelief, two Chechen brothers destroyed the infidels' fortresses on April 16, 2013. During the [ensuing] search [by the authorities for the perpetrators], the elder brother died as a martyr in the field of glory and honor, Allah willing. The younger brother, Dzokhar, remained, and told his dear nation: 'We did this operation as revenge for what America does in Palestine, Iraq, and Afghanistan.' He didn't mention his homeland Chechnya, since this jihad is a jihad of [an entire] nation, not [a campaign] for the liberation of a single land.... The Muslims' lands are one and their honor is one.
    During the manhunt for the perpetrators of the bombing, Governor Deval Patrick said "we are asking people to shelter in place." The request was highly effective; most people stayed home, causing Boston, Watertown, and Cambridge to come to a virtual standstill. According to Time magazine, "media described residents complying with a 'lockdown order,' but in reality the governor's security measure was a request. Scott Silliman, emeritus director of the Center on Law, Ethics and National Security at Duke Law School, said that the shelter-in-place request was voluntary.
    The shelter-in-place directive was criticized by some commentators. Michael Cohen of The Observer said that Americans have little experience with daily terrorism compared to some countries and "are more primed to … assume the absolute worst." Cohen wrote that it was not the first time dangerous murderers have been on the loose in a large American city (citing Christopher Dorner in 2013 and the Beltway sniper attacks in 2002), but noted that "lockdown" measures were not used in those cases. Former congressman and presidential candidate Ron Paul, criticized what he described as a "military-style takeover of parts of Boston" during the investigation and wrote that "this unprecedented move should frighten us as much or more than the attack itself."
    Haaretz's Chemi Salev wrote that "in terms of cost-benefit analysis, from the evil terrorist's point of view, the Boylston Street bombings and their aftermath can only be viewed as a resounding triumph" since the "relatively amateurish" terrorists managed to intimidate a vast number of people and got a maximum amount of publicity. Responding to Salev in the New York Times, Ross Douthat commented that the massive manhunt operation might deter other amateur terrorists, but not hard-core terrorists such as Mohammed Atta. Douthat argued that out-of-the-ordinary measures can only be used when terrorism itself is out-of-the-ordinary: if attacks started to occur more often, people would not be as willing to comply with shelter-in-place commands, yet once a terrorist has been hunted with such an operation, it is hard to justify why such measures should not be taken the next time.
    On the afternoon of the bombing, The New York Post reported that a suspect, a Saudi Arabian male, was under guard and being questioned at a Boston hospital. That evening, Boston Police Commissioner Ed Davis said that there had not been an arrest. The Post did not retract its story about the suspect, leading to widespread reports by CBS News, CNN, and other media that a Middle Eastern suspect was in custody. The day after the bombing, a majority of outlets were reporting that the Saudi was a witness, not a suspect.
    The New York Post on its April 18 front page showed two men, and said they were being sought by the authorities. The two were not the ones being sought as suspects. They were a 17-year-old boy and his track coach. The boy, from Revere, Massachusetts, turned himself over to the police immediately and was cleared after a 20-minute interview in which they advised him to deactivate his Facebook account. New York Post editor Col Allan stated, "We stand by our story. The image was emailed to law enforcement agencies yesterday afternoon seeking information about these men, as our story reported. We did not identify them as suspects." The two were implied to be possible suspects via crowdsourcing on the websites Reddit and 4chan
    Several other people were mistakenly identified as suspects. Two of those wrongly identified as suspects on Reddit were a 17-year-old track star and Sunil Tripathi, a Brown University student missing since March. Tripathi was found dead on April 23 in the Providence River.
    On April 17, the FBI released the following statement:
    Contrary to widespread reporting, no arrest has been made in connection with the Boston Marathon attack. Over the past day and a half, there have been a number of press reports based on information from unofficial sources that has been inaccurate. Since these stories often have unintended consequences, we ask the media, particularly at this early stage of the investigation, to exercise caution and attempt to verify information through appropriate official channels before reporting.
    The decision to release the photos of the Tsarnaev brothers was made in part to limit damage done to those misidentified on the Internet and by the media, and to address concerns over maintaining control of the manhunt.
    2010 Times Square car bombing attempt, attempted bombing in New York City using a pressure cooker bomb and other explosive devices
    2011 Waltham triple murder, a triple homicide to which Tamerlan Tsarnaev has been connected
    2013 Bat Yam bus bombing, bombing of a public bus in Israel using a pressure cooker bomb
    Centennial Olympic Park bombing, a 1996 terrorist attack also targeting a public event
    External images
    Wikimedia Commons has media related to 2013 Boston Marathon bombings.`,
    ];

    this.conteudoDefault = this.listaConteudos[0];
    this.algoritmosDate = [
      [
        "py_heideltime",
        "makes use of Heideltime temporal tagger to detect a range of diferente temporal expressions",
      ],
      [
        "py_rule_based",
        "a simple rule-based approach that only takes into account dates in the format of dddd (e.g., 2021)",
      ],
    ];
    this.algoritmoSelected = this.algoritmosDate[0][0];
    this.dateGranularityOptions = ["full", "year", "month", "day"];
    this.dateGranularitySelected = this.dateGranularityOptions[0];
    this.documentTypeOptions = [
      [
        "news",
        "news-style documents (document creation time should be provided whenever possible)",
      ],
      ["narrative", "narrative-style documents (e.g., Wikipedia articles)"],
      ["colloquial", "non-standard language (e.g., tweets or SMS)"],
      [
        "scientific",
        "documents with a local time frame (e.g., clinical trials)",
      ],
    ];
    this.documentTypeSelected = this.documentTypeOptions[0][0];
    this.languageOptions = [
      "auto-detect",
      "English",
      "Portuguese",
      "Spanish",
      "German",
      "Dutch",
      "Italian",
      "French",
    ];
    this.languagueSelected = this.languageOptions[0];
    this.maxValTH = 1;
    this.dateBegin = 0;
    this.dateEnd = 2100;
    this.numberOfKeyWords = 10;
    this.contextWindow = "full_sentence";
    this.simbaValue = 10;
    this.cheating = false;
    this.showOnlyRel = true;
    this.showOnlyRelSnap = true;
    this.TH = 0.05;
  }
  toggleOptionKeywords() {
    this.hiddenoptionKW = !this.hiddenoptionKW;
  }

  toggleTimeMattersOptions() {
    this.hiddenoptionTM = !this.hiddenoptionTM;
  }

  toggleRel() {
    this.showOnlyRel = !this.showOnlyRel;
    //this.showOnlyRelSnap = this.showOnlyRel;
  }

  changeTH(event: any) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    console.log(event);
    if (event.source) {
      this.TH = event.value;
      return;
    } else {
      if (event.target.value) {
        if (event.target.value > this.maxValTH) {
          this.TH = 1;
          return;
        }
        event.preventDefault();
        this.TH = event.target.value;
      } else {
        this.TH = 0;
        return;
      }
    }
    this.update();
  }
  selecionarDataFim(event: any) {
    this.dateEnd = event.target.value;
    console.log(event.target.value);
  }
  selecionarDataInicio(event: any) {
    this.dateBegin = event.target.value;
    console.log(event.target.value);
  }
  toggleKeywords() {
    this.withKeywords = !this.withKeywords;
    if (this.withKeywords) {
      this.withKeywordsSentence = "Keywords Off";
    } else {
      this.withKeywordsSentence = "Keywords On";
    }
  }
  toggleDocOrSentence() {
    this.byDocOrSentece = !this.byDocOrSentece;
  }
  toggleOption() {
    this.hiddenoption = !this.hiddenoption;
  }
  deleteContent(event: any) {
    this.conteudoDefault = "";
  }

  ngOnInit() {}
  selecionarngram(event: any) {
    this.ngramSelected = event.target.value;
    console.log(event.target.value);
  }
  selecionarDataReferencia(event: any) {
    this.documentCreationTime = event.target.value;
    console.log("DATA!");
    console.log(event.target.value);
  }
  maxSimba(event: any) {
    console.log("simba");
    console.log(event.checked);
    this.simbaValueMax = event.checked;
  }
  selecionarNKeywords(event: any) {
    this.numberOfKeyWords = event.target.value;
    console.log(event.target.value);
  }
  selecionarTipoDocumento(event: any) {
    this.documentTypeSelected = event;
  }
  selecionaTamanhoSimbaVectors(event: any) {
    console.log(event.target.value);
    this.simbaValue = event.target.value;
  }
  selecionarGranularidade(event: any) {
    console.log("entrou mudar granularidade");
    this.dateGranularitySelected = event;
    console.log(event);
  }
  selecionarAlgoritmo(event: any) {
    this.algoritmoSelected = event;
    this.documentCreationTime = "";
  }
  fullSentence(event: any) {
    console.log("full_sentence?");
    console.log(event.checked);
    this.contextFullSentence = event.checked;
  }
  selecionarContextualWindow(event: any) {
    console.log(event.target.value);
    this.contextWindow = event.target.value;
  }
  selecionarLanguage(event: any) {
    this.languagueSelected = event;
  }
  setDefaultText(num: number, language: string) {
    this.selecionarLanguage(language);
    console.log();
    this.conteudoDefault = this.listaConteudos[num];
  }
  setDefaultTexto(texto: any) {
    console.log(texto.value);
    this.conteudoDefault = texto.value;
  }

  public putOnClipboard(event: any, cena: string) {
    event.preventDefault();
    const clipboard = document.createElement("input");
    console.log(cena);
    clipboard.setAttribute("value", cena);
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand("copy");
    document.body.removeChild(clipboard);
  }
  public copyToClipboard(event: any) {
    event.preventDefault();
    if (!this.withKeywords) {
      this._snackBar.open(
        "Message copied to Clipboard",
        "Length: " + this.result.TextNormalized.length + " characters",
        {
          duration: 2000,
        }
      );
      const clipboard = document.createElement("input");

      clipboard.setAttribute("value", this.result.TextNormalized);
      document.body.appendChild(clipboard);
      clipboard.select();
      document.execCommand("copy");
      document.body.removeChild(clipboard);
    } else {
      this._snackBar.open(
        "Message copied to Clipboard",
        "Length: " +
          this.result.TextNormalized.split("<kw>")
            .join("")
            .split("</kw>")
            .join("").length +
          " characters",
        {
          duration: 2000,
        }
      );
      const clipboard = document.createElement("input");

      clipboard.setAttribute(
        "value",
        this.result.TextNormalized.split("<kw>")
          .join("")
          .split("</kw>")
          .join("")
      );
      document.body.appendChild(clipboard);
      clipboard.select();
      document.execCommand("copy");
      document.body.removeChild(clipboard);
    }
  }
  goBack() {
    this.result = false;
    this.requestMade = false;
    this.loading = false;
    this.languagueSelected = this.languageOptions[0];
    this.withKeywords = true;
    this.withKeywordsSentence = "Keywords Off";
  }
  public update() {
    this.exe_time_total = this.result.ExecutionTime.TotalTime.toFixed(3);
    this.exe_time_YAKE = this.result.ExecutionTime.YAKE.toFixed(3);
    this.exe_time_GTE = this.result.ExecutionTime.GTE.toFixed(3);
    if (this.result.ExecutionTime.heideltime_processing) {
      this.exe_time_algo = this.result.ExecutionTime.heideltime_processing.toFixed(
        3
      );
    } else {
      this.exe_time_algo = this.result.ExecutionTime.rule_based_processing.toFixed(
        3
      );
    }
    console.log("temporal cenas");
    console.log(this.result.TempExpressions);
    let last = "";
    this.numero_total = this.result.TempExpressions.length;
    this.numero_total2 = this.result.TempExpressions.filter((cada) => {
      return this.result.Score[cada[0].toLowerCase()][0] > 0.35;
    }).length;
    console.log(this.numero_total);
    last = "";
    console.log("LISTA Expressoes");
    console.log(this.result.TempExpressions);
    this.differentValues = this.result.TempExpressions.sort(
      (a, b) => a[0] - b[0]
    ).filter((element, index, array) => {
      if (index == 0) {
        last = element[0];
        return /^\d+$/.test(element[0].toString().split("-").join(""));
      } else {
        // console.log("element");
        // console.log(element[0].toString().split('-').join(''));
        // console.log("Element is Viable");
        // console.log(/^\d+$/.test(element[0].toString().split('-').join('')));
        let este = last;
        last = element[0];
        return (
          element[0].toString().split("-").join("") != este &&
          /^\d+$/.test(element[0].toString().split("-").join(""))
        );
      }
    });

    if (this.byDocOrSentece) {
      this.differentRelValues = this.differentValues.filter(
        (element, index, array) => {
          /*console.log(element);
              console.log(array);
              console.log(index);
              console.log(this.result.Score);
              console.log(this.result.Score[element[0].toLowerCase()]);*/
          const a = element[0].toLowerCase() + "";
          // console.log(a);
          return this.result.Score[a][0] > 0.35;
        }
      );
    } /**else docOrSentence */ else {
      this.differentRelValues = this.differentValues.map((a) => {
        return this.result.Score[a[0]];
      });

      //this.numero_total2 = this.result.Score.filter((cada)=>{return cada[0]>0.35}).length;
      console.log("teste");
      let valores = Object.keys(this.result.Score);

      console.log(valores);
      let total2 = 0;
      valores.map((kelp) => {
        console.log(this.result.Score[kelp]);
        Object.keys(this.result.SentencesTokens).map((kolp) => {
          console.log(kolp);
          if (this.result.Score[kelp][kolp + ""]) {
            if (this.result.Score[kelp][kolp + ""][0] > 0.35) {
              total2++;
              console.log(this.result.Score[kelp][kolp + ""][0]);
              console.log(this.result.Score[kelp][kolp + ""]);
            }
          }
        });
      });
      this.numero_total2 = total2;
      console.log("teste");
      valores = Object.keys(this.result.Score);

      console.log(valores);
      total2 = 0;
      valores.map((kelp) => {
        console.log(this.result.Score[kelp]);
        Object.keys(this.result.SentencesTokens).map((kolp) => {
          console.log(kolp);
          if (this.result.Score[kelp][kolp + ""]) {
            if (this.result.Score[kelp][kolp + ""][0] >= 0) {
              total2++;
              console.log(this.result.Score[kelp][kolp + ""][0]);
              console.log(this.result.Score[kelp][kolp + ""]);
            }
          }
        });
      });
      this.numero_total = total2;
      this.result.Score;
    }
    //console.log(this.differentRelValues);
    //console.log(this.differentValues);
    //console.log(this.result.Score);

    let c = [];
    let a = {};
    let b = {};
    const d = [];

    let c2 = [];
    let a2 = {};
    let b2 = {};
    const d2 = [];
    // tslint:disable-next-line: forin
    for (const i in Object.keys(this.result.Score)) {
      // console.log(this.result.Score[Object.keys(this.result.Score)[i]][0]);
      // handle Dataset
      if (this.byDocOrSentece) {
        console.log("resultado");
        let value_to_be_replaced = Object.keys(this.result.Score)[i];
        console.log(value_to_be_replaced);
        //[Object.keys(this.result.Score)[i].toLowerCase()]);
        let value_to_replace_for = this.result.TempExpressions.filter((a) => {
          return a[0].toLowerCase() == Object.keys(this.result.Score)[i];
        })[0][1];
        value_to_replace_for =
          "<strong><d>" + value_to_replace_for + "</d></strong>";
        console.log(value_to_replace_for);
        let sentence_to_write = this.result.SentencesNormalized.map((a) => {
          //console.log(a);
          //console.log(a.toString().search(Object.keys(this.result.Score)[i]))
          if (
            a
              .toLowerCase()
              .toString()
              .search(Object.keys(this.result.Score)[i].toLowerCase()) != -1
          ) {
            let nova = a.replace(
              "<d>" + value_to_be_replaced + "</d>",
              "<d>" + value_to_replace_for + "</d>"
            );
            console.log(nova);
            nova = nova.replace(
              "<d>" + value_to_be_replaced.toUpperCase() + "</d>",
              "<d>" + value_to_replace_for + "</d>"
            ); //.toLowerCase().toString().replace(Object.keys(this.result.Score)[i].toLowerCase(), )
            console.log(nova);
            return nova;
          }
        });

        sentence_to_write = sentence_to_write.join("__,");
        this.result.TempExpressions.map((a) => {
          console.log("DEBUG TEMPORAL");
          console.log(a);
          if (sentence_to_write.search(a[0]) != -1) {
            sentence_to_write = sentence_to_write.replace(
              "<d>" + a[0] + "</d>",
              "<d>" + a[1] + "</d>"
            );
          }
          if (sentence_to_write.search(a[0].toUpperCase()) != -1) {
            sentence_to_write = sentence_to_write.replace(
              "<d>" + a[0].toUpperCase() + "</d>",
              "<d>" + a[1] + "</d>"
            );
          }
        });
        sentence_to_write = sentence_to_write.split("__,").filter((aasd) => {
          return aasd.length != 0;
        })[0];
        //console.log(sentence_to_write);
        a =
          '<p class="noticem5">Score: ' +
          this.result.Score[Object.keys(this.result.Score)[i]][0] +
          "</p><p>" +
          sentence_to_write +
          "</p>";
        if (this.result.Score[Object.keys(this.result.Score)[i]][0] > 0.35) {
          a =
            '<p class="noticem4">Score: ' +
            this.result.Score[Object.keys(this.result.Score)[i]][0] +
            "</p><p>" +
            sentence_to_write +
            "</p>";

          a2 =
            '<p class="noticem4">Score: ' +
            this.result.Score[Object.keys(this.result.Score)[i]][0] +
            "</p><p>" +
            sentence_to_write +
            "</p>";
        } else {
          a2 = null;
        }
      } else {
        let valorDeA = "";
        let valorDeA2 = "";
        // tslint:disable-next-line: forin
        for (const xd in this.result.Score[Object.keys(this.result.Score)[i]]) {
          // if()
          d.push({
            x: Object.keys(this.result.Score)[i],
            y: this.result.Score[Object.keys(this.result.Score)[i]][xd][0],
            series: xd,
          });
          // console.log(d);

          console.log(a);
          let sentence_to_write = this.result.SentencesNormalized[xd.toString()]
            .split('"')
            .join("''");
          let data_chave = Object.keys(this.result.Score)[i];

          let data_chave_replaced_by =
            "<strong>" + this.result.Score[data_chave][xd][1][0] + "</strong>";
          sentence_to_write = sentence_to_write.replace(
            data_chave,
            data_chave_replaced_by
          );
          sentence_to_write = sentence_to_write.replace(
            data_chave.toLowerCase(),
            data_chave_replaced_by
          );
          sentence_to_write = sentence_to_write.replace(
            data_chave.toUpperCase(),
            data_chave_replaced_by
          );
          // tslint:disable-next-line: whitespace
          // tslint:disable-next-line: max-line-length
          if (
            this.result.Score[Object.keys(this.result.Score)[i]][xd][0] > 0.35
          ) {
            // tslint:disable-next-line: whitespace
            // tslint:disable-next-line: max-line-length
            valorDeA +=
              '<p class="noticem4">Score: ' +
              this.result.Score[Object.keys(this.result.Score)[i]][xd][0] +
              "</p><p>" +
              sentence_to_write +
              "</p>";

            valorDeA2 +=
              '<p class="noticem4">Score: ' +
              this.result.Score[Object.keys(this.result.Score)[i]][xd][0] +
              "</p><p>" +
              sentence_to_write +
              "</p>";

            d2.push({
              x: Object.keys(this.result.Score)[i],
              y: this.result.Score[Object.keys(this.result.Score)[i]][xd][0],
              series: xd,
            });
            // console.log(d2);
            // TODO: meter d e d2 nos datasets
          } else {
            //valorDeA += '<span title="' + this.result.SentencesNormalized[xd.toString()].split('\"').join('\'\'') + '"><p class="noticem5">Score: ' + this.result.Score[Object.keys(this.result.Score)[i]][xd][0] + '</p><p>'+this.result.SentencesNormalized[xd.toString()].split('\"').join('\'\'')+'</p></span>';
            valorDeA +=
              '<p class="noticem5">Score: ' +
              this.result.Score[Object.keys(this.result.Score)[i]][xd][0] +
              "</p><p>" +
              sentence_to_write +
              "</p>";
          }
        }
        a = valorDeA;
        a2 = valorDeA2;
      }
      b = Object.keys(this.result.Score)[i];
      b2 = Object.keys(this.result.Score)[i];

      // console.log("a");
      // console.log(a);
      // console.log("b");
      // console.log(b);
      // console.log("end");
      //a2 = a2.replace()
      //a2 = a2.replace()

      c2.push({ x: b2, y: a2, z: d2 });
      c.push({ x: b, y: a, z: d });
      // console.log();
      // console.log(Object.keys(this.result.Score)[i].split('-').join(''));

      /^\d+$/.test(
        Object.keys(this.result.Score)[i].substring(0, 10).split("-").join("")
      )
        ? ""
        : c.pop();
      /^\d+$/.test(
        Object.keys(this.result.Score)[i].substring(0, 10).split("-").join("")
      )
        ? ""
        : c2.pop();
      c2 = c2.filter((y) => {
        if (y.y) {
          return true;
        } else {
          return false;
        }
      });
      /*
          if (!a2) {
              c2.pop();
            }*/
    }
    // tslint:disable-next-line: forin
    for (const data in c) {
      // console.log(c[data].x);
      // console.log(c[data].x.substring(0,10));
      let data_prov = c[data].x.substring(0, 10).split("-").join(" ");
      const j = Date.parse(data_prov);
      // console.log (j);
      c[data].dateparsed = j;
      data_prov = data_prov.split(" ").join("");
      if (data_prov.length == 6) {
        data_prov += "00";
      }
      if (data_prov.length == 4) {
        data_prov += "0000";
      }
      c[data].dateparsed2 = data_prov;
    }
    // tslint:disable-next-line: forin
    for (const data in c2) {
      let data_prov = c2[data].x.substring(0, 10).split("-").join(" ");
      const j = Date.parse(data_prov);
      // console.log (j);
      c2[data].dateparsed = j;
      data_prov = data_prov.split(" ").join("");
      if (data_prov.length == 6) {
        data_prov += "00";
      }
      if (data_prov.length == 4) {
        data_prov += "0000";
      }
      c2[data].dateparsed2 = data_prov;
    }
    c = c.sort((a, b) => {
      console.log("a");
      console.log("b");
      console.log(a);
      console.log(b);
      return a.dateparsed2 - b.dateparsed2;
    });
    c2 = c2.sort((a, b) => {
      console.log("a");
      console.log("b");
      console.log(a);
      console.log(b);
      return a.dateparsed2 - b.dateparsed2;
    });
    c = c.sort((a, b) => {
      return a.dateparsed - b.dateparsed;
    });
    c2 = c2.sort((a, b) => {
      return a.dateparsed - b.dateparsed;
    });
    // console.log("a,b,join");
    // console.log(a);
    // console.log(b);
    // console.log(this.result.Score);
    // console.log(c);
    // console.log("end");
    this.dataset = c;
    this.datasetFixed = this.dataset;
    for (let hu = 0; hu < this.datasetFixed.length; hu++) {
      this.result.TempExpressions.map((a) => {
        console.log(a);
        if (this.datasetFixed[hu].y.search(a[0]) != -1) {
          this.datasetFixed[hu].y = this.datasetFixed[hu].y.replace(
            "<d>" + a[0] + "</d>",
            "<d>" + a[1] + "</d>"
          );
        }
        if (this.datasetFixed[hu].y.search(a[0].toUpperCase()) != -1) {
          this.datasetFixed[hu].y = this.datasetFixed[hu].y.replace(
            "<d>" + a[0].toUpperCase() + "</d>",
            "<d>" + a[1] + "</d>"
          );
        }
      });
    }
    this.datasetRelOnly = c2;
    this.datasetFixed2 = this.datasetRelOnly;
    for (let hu = 0; hu < this.datasetFixed2.length; hu++) {
      this.result.TempExpressions.map((a) => {
        console.log(a);
        if (this.datasetFixed2[hu].y.search(a[0]) != -1) {
          this.datasetFixed2[hu].y = this.datasetFixed2[hu].y.replace(
            "<d>" + a[0] + "</d>",
            "<d>" + a[1] + "</d>"
          );
        }
        if (this.datasetFixed[hu].y.search(a[0].toUpperCase()) != -1) {
          this.datasetFixed2[hu].y = this.datasetFixed2[hu].y.replace(
            "<d>" + a[0].toUpperCase() + "</d>",
            "<d>" + a[1] + "</d>"
          );
        }
      });
    }
    this.datasetFixed = this.datasetFixed.filter((cada) => {
      console.log("cada")
      console.log(cada)
      return cada.y.includes("<strong");
    });
    this.datasetFixed2 = this.datasetFixed2.filter((cada) => {
      console.log("cada")
      console.log(cada)
      return cada.y.includes("<strong");
    });
    console.log("SEE DATA");

    console.log(this.dataset);
    console.log(this.datasetRelOnly);
  }
  public getKeyword(event: any) {
    event.preventDefault();
    // console.log(event.target.docCreatDate.value);
    // {{ dateObj | date:'mm:ss' }}
    if (this.conteudoDefault.length == 0) {
      this._snackBar.open("No text to annotate", "", {
        duration: 2000,
      });
      return;
    }

    this.loading = true;
    this._snackBar.open("Your request is being processed", "", {
      duration: 2000,
    });
    if (this.languagueSelected == "auto-detect") {
      this._lang
        .getLanguageFromContent(this.conteudoDefault)
        .pipe(take(1))
        .subscribe((res) => {
          if (res) {
            this._snackBar.open("Language Detected: ", res.lang, {
              duration: 2000,
            });
          } else {
            this._snackBar.open(
              "Text Too Short",
              this.conteudoDefault.length.toString(),
              {
                duration: 2000,
              }
            );
          }
          switch (res.lang) {
            case "en":
              this.languagueSelected = "English";
              break;
            case "fr":
              this.languagueSelected = "French";
              break;
            case "pt":
              this.languagueSelected = "Portuguese";
              break;
            case "ge":
              this.languagueSelected = "German";
              break;
            case "it":
              this.languagueSelected = "Italian";
              break;
            case "nl":
              this.languagueSelected = "Dutch";
              break;
            case "es":
              this.languagueSelected = "Spanish";
              break;
            default:
              this._snackBar.open("Language not Supported", res.lang, {
                duration: 2000,
              });
              break;
          }

          let j, k;
          if (this.contextFullSentence) {
            j = "full_sentence";
          } else {
            j = this.contextWindow;
          }
          if (this.simbaValueMax) {
            k = "max";
          } else {
            k = this.simbaValue;
          }
          this.optio = {
            docCreatTime: this.documentCreationTime,
            dateGranularity: this.dateGranularitySelected,
            docOrSentence: this.byDocOrSentece ? "doc" : "sentence",
            algo: this.algoritmoSelected,
            ngram: this.ngramSelected,
            language: this.languagueSelected,
            numberOfKeywords: this.numberOfKeyWords,
            nContextualWindow: j,
            documentType: this.documentTypeSelected,
            dateBegin: this.dateBegin,
            dateEnd: this.dateEnd,
            n: k,
            tH: this.TH,
          };

          this.timeline
            .getTextKeyDateFromSingleDoc(this.conteudoDefault, this.optio)
            .pipe(take(1))
            .subscribe((res2) => {
              if (res2) {
                // console.log('nice');
                this.result = res2;
                // pedido recebido aqui
                // console.log(res);
                this.update();
                this.requestMade = true;
                this.loading = false;

                return " ";
              } else {
                console.log("oof");
                return " ";
              }
            });
        });
    } else {
      let j, k;
      if (this.contextFullSentence) {
        j = "full_sentence";
      } else {
        j = this.contextWindow;
      }
      if (this.simbaValueMax) {
        k = "max";
      } else {
        k = this.simbaValue;
      }

      this.optio = {
        docCreatTime: this.documentCreationTime,
        dateGranularity: this.dateGranularitySelected,
        docOrSentence: this.byDocOrSentece ? "doc" : "sentence",
        algo: this.algoritmoSelected,
        ngram: this.ngramSelected,
        language: this.languagueSelected,
        numberOfKeywords: this.numberOfKeyWords,
        nContextualWindow: j,
        documentType: this.documentTypeSelected,
        dateBegin: this.dateBegin,
        dateEnd: this.dateEnd,
        n: k,
        tH: this.TH,
      };

      this.timeline
        .getTextKeyDateFromSingleDoc(this.conteudoDefault, this.optio)
        .subscribe((res) => {
          if (res) {
            // console.log('nice');
            this.result = res;
            // pedido recebido aqui
            // console.log(res);
            this.update();
            this.requestMade = true;
            this.loading = false;
            return " ";
          } else {
            console.log("oof");
            return " ";
          }
        });
    }
  }
}
