import React, { useState } from "react";
import { EngToTelService } from "../services/engToTelugu";

interface Props {
  loadFileWithId: (fileId: string) => Promise<void>;
}

type Document = {
  id: number;
  name: string;
  url: string;
  lang: string;
  title2: string;
};

type Book = {
  id: number;
  name: string;
  documents: Document[];
};

type Subject = {
  id: number;
  name: string;
  books: Book[];
};

type Taragati = {
  id: number;
  name: string;
  subjects: Subject[];
};

// Sample Data
const data: Taragati[] = [
  {
    id: 1,
    name: "Telugu Classes",
    subjects: [
      {
        id: 1,
        name: "Level-1",
        books: [
          {
            id: 1,
            name: "Acchulu",
            documents: [
              {
                id: 1,
                name: "Letter-a",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/algebra1.pdf",
              },
              {
                id: 2,
                name: "Letter-aa",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/algebra2.pdf",
              },
            ],
          },
          {
            id: 2,
            name: "Hallulu",
            documents: [
              {
                id: 3,
                name: "Letter-ka",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/geometry1.pdf",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Level-2",
        books: [
          {
            id: 3,
            name: "Gunintaalu",
            documents: [
              {
                id: 4,
                name: "Motion",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 4,
            name: "Vottulu",
            documents: [
              {
                id: 4,
                name: "Motion",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "Level-3",
        books: [
          {
            id: 5,
            name: "padaalu",
            documents: [
              {
                id: 4,
                name: "Motion",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/physics1.pdf",
              },
            ],
          },
        ],
      },
      {
        id: 4,
        name: "Level-4",
        books: [
          {
            id: 3,
            name: "vaakyaalu",
            documents: [
              {
                id: 4,
                name: "Motion",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/physics1.pdf",
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Level-5",
        books: [
          {
            id: 1,
            name: "పెద్ద బాలశిక్ష",
            documents: [
              {
                id: 1,
                name: "test",
                lang: "te",
                title2: "	reMDu aksharamula padamulu	",
                url: "",
              },
              {
                id: 2,
                name: "test",
                lang: "te",
                title2: "	mUDu aksharamula padamulu	",
                url: "",
              },
              {
                id: 3,
                name: "test",
                lang: "te",
                title2: "	reMDu aksharamula pErlu	",
                url: "",
              },
              {
                id: 4,
                name: "test",
                lang: "te",
                title2: "	mUDu aksharamula pErlu	",
                url: "",
              },
              {
                id: 5,
                name: "test",
                lang: "te",
                title2: "	nAlugu aksharamula pErlu	",
                url: "",
              },
              {
                id: 6,
                name: "test",
                lang: "te",
                title2: "	nIti vAkyamulu	",
                url: "",
              },
              {
                id: 7,
                name: "test",
                lang: "te",
                title2: "	prAsa vAkyamulu	",
                url: "",
              },
              {
                id: 8,
                name: "test",
                lang: "te",
                title2: "	sadbuddhi Sabdamulu	",
                url: "",
              },
              {
                id: 9,
                name: "test",
                lang: "te",
                title2: "	purusha vAcaka Sabdamulu	",
                url: "",
              },
              {
                id: 10,
                name: "test",
                lang: "te",
                title2: "	strI vAcaka Sabdamulu	",
                url: "",
              },
              {
                id: 11,
                name: "test",
                lang: "te",
                title2: "	jaMtu vAcaka Sabdamulu	",
                url: "",
              },
              {
                id: 12,
                name: "test",
                lang: "te",
                title2: "	acEtanArdhaka Sabdamulu	",
                url: "",
              },
              {
                id: 13,
                name: "test",
                lang: "te",
                title2: "	Arusvaramulaku miMcani mATalu	",
                url: "",
              },
              {
                id: 14,
                name: "test",
                lang: "te",
                title2: "	dRshTAMta vAkyamulu	",
                url: "",
              },
              {
                id: 15,
                name: "test",
                lang: "te",
                title2: "	lakshmInivAsa sthAnamulu	",
                url: "",
              },
              {
                id: 16,
                name: "test",
                lang: "te",
                title2: "	alakshmInivAsa sthAnamulu	",
                url: "",
              },
              {
                id: 17,
                name: "test",
                lang: "te",
                title2: "	saMpadguNamulu	",
                url: "",
              },
              {
                id: 18,
                name: "test",
                lang: "te",
                title2: "	dAridryamulu	",
                url: "",
              },
              {
                id: 19,
                name: "test",
                lang: "te",
                title2: "	puNyamulu	",
                url: "",
              },
              { id: 20, name: "test", lang: "te", title2: "	pApamulu	", url: "" },
              {
                id: 21,
                name: "test",
                lang: "te",
                title2: "	cEyavalasina panulu	",
                url: "",
              },
              {
                id: 22,
                name: "test",
                lang: "te",
                title2: "	cEyarAni panulu	",
                url: "",
              },
              { id: 23, name: "test", lang: "te", title2: "	amRtamu	", url: "" },
              { id: 24, name: "test", lang: "te", title2: "	vishamu	", url: "" },
              {
                id: 25,
                name: "test",
                lang: "te",
                title2: "	eppuDunu suguNamunu viDuvanivi	",
                url: "",
              },
              {
                id: 26,
                name: "test",
                lang: "te",
                title2: "	eppuDunu dOshamunu viDuvanivi	",
                url: "",
              },
              {
                id: 27,
                name: "test",
                lang: "te",
                title2: "	cacciyu bratikiyunna vAru	",
                url: "",
              },
              {
                id: 28,
                name: "test",
                lang: "te",
                title2: "	bratikiyu caccina vAru	",
                url: "",
              },
              {
                id: 29,
                name: "test",
                lang: "te",
                title2: "	samayamunaMdu upakariMcunavi	",
                url: "",
              },
              {
                id: 30,
                name: "test",
                lang: "te",
                title2: "	samayamunaMdu upakariMpanivi	",
                url: "",
              },
              {
                id: 31,
                name: "test",
                lang: "te",
                title2: "	okaTi galigi prakASiMcunavi	",
                url: "",
              },
              {
                id: 32,
                name: "test",
                lang: "te",
                title2: "	okaTi lEka prakASiMpanivi	",
                url: "",
              },
              {
                id: 33,
                name: "test",
                lang: "te",
                title2: "	oka guNamucEta ma~raiyoka guNamu galugunavi	",
                url: "",
              },
              {
                id: 34,
                name: "test",
                lang: "te",
                title2: "	oka dOshamucEta ma~raiyoka dOshamu galugunav‌	",
                url: "",
              },
              {
                id: 35,
                name: "test",
                lang: "te",
                title2: "	vyAdhibuTTiMpanivi	",
                url: "",
              },
              {
                id: 36,
                name: "test",
                lang: "te",
                title2: "	vyAdhibuTTiMcunavi	",
                url: "",
              },
              { id: 37, name: "test", lang: "te", title2: "	dEvatalu	", url: "" },
              {
                id: 38,
                name: "test",
                lang: "te",
                title2: "	rAkshasulu	",
                url: "",
              },
              {
                id: 39,
                name: "test",
                lang: "te",
                title2: "	maMciyunnacOTa ceDuyu uMDunu	",
                url: "",
              },
              {
                id: 40,
                name: "test",
                lang: "te",
                title2: "	gollapillavADu puli katha	",
                url: "",
              },
              {
                id: 41,
                name: "test",
                lang: "te",
                title2: "	taMDri koDukula katha	",
                url: "",
              },
              {
                id: 42,
                name: "test",
                lang: "te",
                title2: "	pallevADu pAmu katha	",
                url: "",
              },
              {
                id: 43,
                name: "test",
                lang: "te",
                title2: "	nakka drAkshapaMDu katha	",
                url: "",
              },
              {
                id: 44,
                name: "test",
                lang: "te",
                title2: "	bhImuDu sOmuDu katha	",
                url: "",
              },
              {
                id: 45,
                name: "test",
                lang: "te",
                title2: "	tAbElu kuMdElu katha	",
                url: "",
              },
              {
                id: 46,
                name: "test",
                lang: "te",
                title2: "	kaTTelu koTTuvADu baMgAru goDDali	",
                url: "",
              },
              {
                id: 47,
                name: "test",
                lang: "te",
                title2: "	iddaru snEhitula katha	",
                url: "",
              },
              {
                id: 48,
                name: "test",
                lang: "te",
                title2: "	gurubhakti katha	",
                url: "",
              },
              {
                id: 49,
                name: "test",
                lang: "te",
                title2: "	cinna nIti kathalu	",
                url: "",
              },
              { id: 50, name: "test", lang: "te", title2: "	gaNitamu	", url: "" },
              { id: 51, name: "test", lang: "te", title2: "	yugamulu	", url: "" },
              { id: 52, name: "test", lang: "te", title2: "	Sakamulu	", url: "" },
              {
                id: 53,
                name: "test",
                lang: "te",
                title2: "	paMcAMga vivaraNa	",
                url: "",
              },
              { id: 54, name: "test", lang: "te", title2: "	rASulu	", url: "" },
              {
                id: 55,
                name: "test",
                lang: "te",
                title2: "	pakshamulu	",
                url: "",
              },
              { id: 56, name: "test", lang: "te", title2: "	vAramulu	", url: "" },
              {
                id: 57,
                name: "test",
                lang: "te",
                title2: "	nakshatramulu	",
                url: "",
              },
              {
                id: 58,
                name: "test",
                lang: "te",
                title2: "	hiMduvula paMDugalu - parva tithulu	",
                url: "",
              },
              { id: 59, name: "test", lang: "te", title2: "	vEdamulu	", url: "" },
              {
                id: 60,
                name: "test",
                lang: "te",
                title2: "	bhUgOLa SAstramu	",
                url: "",
              },
              { id: 61, name: "test", lang: "te", title2: "	viSvamu	", url: "" },
              {
                id: 62,
                name: "test",
                lang: "te",
                title2: "	bhArata dESamu	",
                url: "",
              },
              {
                id: 63,
                name: "test",
                lang: "te",
                title2: "	bhAratadESa saMkshipta caritra	",
                url: "",
              },
              {
                id: 64,
                name: "test",
                lang: "te",
                title2: "	AMdhrapradES‌	",
                url: "",
              },
              {
                id: 65,
                name: "test",
                lang: "te",
                title2: "	mukhyanadulu	",
                url: "",
              },
              {
                id: 66,
                name: "test",
                lang: "te",
                title2: "	AMdhrabhAsha	",
                url: "",
              },
              {
                id: 67,
                name: "test",
                lang: "te",
                title2: "	AMdhrakavulu	",
                url: "",
              },
            ],
          },
          {
            id: 2,
            name: "బొమ్మల రామాయణం",
            documents: [
              {
                id: 1,
                name: "test",
                lang: "te",
                title2: "	akshara dIpaM	",
                url: "",
              },
              {
                id: 2,
                name: "test",
                lang: "te",
                title2: "	rAmAyaNa kadhAkramaM	",
                url: "",
              },
              {
                id: 3,
                name: "test",
                lang: "te",
                title2: "	pAyasa kalaSaM	",
                url: "",
              },
              {
                id: 4,
                name: "test",
                lang: "te",
                title2: "	bala, ati bala	",
                url: "",
              },
              {
                id: 5,
                name: "test",
                lang: "te",
                title2: "	virigina villu	",
                url: "",
              },
              {
                id: 6,
                name: "test",
                lang: "te",
                title2: "	sItA kaLyANaM cEdu mATalu	",
                url: "",
              },
              {
                id: 7,
                name: "test",
                lang: "te",
                title2: "	gaMga dATAru	",
                url: "",
              },
              {
                id: 8,
                name: "Bharat's hunger strike",
                lang: "te",
                title2: "	bharatuni nirAhAra dIksha	",
                url: "1pNuQQbyx_a4nIQkOsJTmcPDfbNl1K2u9",
              },
              {
                id: 9,
                name: "test",
                lang: "te",
                title2: "	rAkshasa saMhAraM	",
                url: "",
              },
              {
                id: 10,
                name: "test",
                lang: "te",
                title2: "	kapaTa sanyAsi	",
                url: "",
              },
              { id: 11, name: "test", lang: "te", title2: "	Sabari	", url: "" },
              {
                id: 12,
                name: "test",
                lang: "te",
                title2: "	agni sAkshigA	",
                url: "",
              },
              {
                id: 13,
                name: "test",
                lang: "te",
                title2: "	vAli vadha	",
                url: "",
              },
              {
                id: 14,
                name: "test",
                lang: "te",
                title2: "	laMkA dahanaM	",
                url: "",
              },
              {
                id: 15,
                name: "test",
                lang: "te",
                title2: "	rAmunitO snEhaM	",
                url: "",
              },
              { id: 16, name: "test", lang: "te", title2: "	vaMtena	", url: "" },
              {
                id: 17,
                name: "test",
                lang: "te",
                title2: "	rAvaNa vadha	",
                url: "",
              },
              {
                id: 18,
                name: "test",
                lang: "te",
                title2: "	rAma rAjyaM	",
                url: "",
              },
              {
                id: 19,
                name: "test",
                lang: "te",
                title2: "	kuSa lavulu	",
                url: "",
              },
              {
                id: 20,
                name: "test",
                lang: "te",
                title2: "	rAmAyaNa vij~nAnaM	",
                url: "",
              },
            ],
          },

          {
            id: 3,
            name: "బొమ్మల భారతం",
            documents: [
              {
                id: 1,
                name: "test",
                lang: "te",
                title2: "	kathAprAraMbhamu	",
                url: "1kvu4rkEA2O29DtiWl5AUzkn1KjHQOixM",
              },
              {
                id: 2,
                name: "test",
                lang: "te",
                title2: "	gaMgA SaMtanula viyOgamu	",
                url: "",
              },
              {
                id: 3,
                name: "test",
                lang: "te",
                title2:
                  "	SaMtanuDu saMtAnavRddhikai marala peMDliyADedanani bhIshmuniki ceppuTa	",
                url: "",
              },
              {
                id: 4,
                name: "test",
                lang: "te",
                title2: "	bhIshmuni pratij~na	",
                url: "",
              },
              {
                id: 5,
                name: "test",
                lang: "te",
                title2:
                  "	peMDliyADi rAjyamU-vaMSamU nilpumani satyavati bhIshmuni kOruTa	",
                url: "",
              },
              {
                id: 6,
                name: "test",
                lang: "te",
                title2: "	dhRtarAshTruni paTTAbhishEkamu	",
                url: "",
              },
              {
                id: 7,
                name: "test",
                lang: "te",
                title2: "	rAjakumArula bAlyakrIDa	",
                url: "",
              },
              {
                id: 8,
                name: "test",
                lang: "te",
                title2: "	rAjakumarula astravidyA parIksha	",
                url: "",
              },
              {
                id: 9,
                name: "test",
                lang: "te",
                title2: "	arjunuDu gurudakshiNa	",
                url: "",
              },
              {
                id: 10,
                name: "test",
                lang: "te",
                title2: "	lAkshAgRhadahanamu	",
                url: "",
              },
              {
                id: 11,
                name: "test",
                lang: "te",
                title2: "	hiDiMbAsuravadha	",
                url: "",
              },
              {
                id: 12,
                name: "test",
                lang: "te",
                title2: "	bakAsura saMhAramu	",
                url: "",
              },
              {
                id: 13,
                name: "test",
                lang: "te",
                title2: "	arjunuDu matsyayaMtramu nEyuTa	",
                url: "",
              },
              {
                id: 14,
                name: "test",
                lang: "te",
                title2:
                  "	gOvulanu viDipiMpumani brAhmaNuDu arjununi prArthiMcuTa	",
                url: "",
              },
              {
                id: 15,
                name: "test",
                lang: "te",
                title2: "	arjununi tIrthayAtra	",
                url: "",
              },
              {
                id: 16,
                name: "test",
                lang: "te",
                title2: "	subhadra yatirUpamulOvunna arjununi sEviMcuTa	",
                url: "",
              },
              {
                id: 17,
                name: "test",
                lang: "te",
                title2: "	subhadrArjunula prayANamu	",
                url: "",
              },
              {
                id: 18,
                name: "test",
                lang: "te",
                title2: "	khAMDava vana dahanaM	",
                url: "",
              },
              {
                id: 19,
                name: "test",
                lang: "te",
                title2: "	dharmarAju sabhaku nAraduDu vaccuTa	",
                url: "",
              },
              {
                id: 20,
                name: "test",
                lang: "te",
                title2: "	jarAsaMdhavadha	",
                url: "",
              },
              {
                id: 21,
                name: "test",
                lang: "te",
                title2: "	SiSupAlavadha	",
                url: "",
              },
              {
                id: 22,
                name: "test",
                lang: "te",
                title2: "	duryOdhanuni AlOcana	",
                url: "",
              },
              {
                id: 23,
                name: "test",
                lang: "te",
                title2: "	duSSAsanuDu draupadini juTTupaTTi yIDcukonivaccuTa	",
                url: "",
              },
              {
                id: 24,
                name: "test",
                lang: "te",
                title2: "	dhRtarAshTruDu draupadiki varAliccuTa	",
                url: "",
              },
              {
                id: 25,
                name: "test",
                lang: "te",
                title2: "	pAMDavula vanagamanaM	",
                url: "",
              },
              {
                id: 26,
                name: "test",
                lang: "te",
                title2: "	saiMdhavuDu draupadi nettukoni pOvuTa	",
                url: "",
              },
              {
                id: 27,
                name: "test",
                lang: "te",
                title2: "	bhImuDu saiMdhavuni parAbhaviMci viDucuTa	",
                url: "",
              },
              {
                id: 28,
                name: "test",
                lang: "te",
                title2: "	iMdruDu karNuni kavaca kuMDalAlanu hariMcuTa	",
                url: "",
              },
              {
                id: 29,
                name: "test",
                lang: "te",
                title2: "	pAMDavulu mAruvEshAlu tAlcuTa	",
                url: "",
              },
              {
                id: 30,
                name: "test",
                lang: "te",
                title2: "	bhImuDu kIcakulanu caMpi draupadini viDipiMcuTa	",
                url: "",
              },
              {
                id: 31,
                name: "test",
                lang: "te",
                title2: "	uttara bommapottikalanu temmani bRhannalanu kOruTa	",
                url: "",
              },
              {
                id: 32,
                name: "test",
                lang: "te",
                title2: "	virATuDu dharmarAjunu pAcikalatO koTTuTa	",
                url: "",
              },
              {
                id: 33,
                name: "test",
                lang: "te",
                title2: "	uttarAbhimanyula kaLyANamu	",
                url: "",
              },
              {
                id: 34,
                name: "test",
                lang: "te",
                title2: "	SrIkRshNa rAyabAraM	",
                url: "",
              },
              {
                id: 35,
                name: "test",
                lang: "te",
                title2: "	dhuryOdhanuDU arjunuDU kRshNuni sAyaM kOruTa	",
                url: "",
              },
              {
                id: 36,
                name: "test",
                lang: "te",
                title2: "	kRshNuDu arjununi tErcuTa	",
                url: "",
              },
              {
                id: 37,
                name: "test",
                lang: "te",
                title2: "	bhIshmuDu aMpaSayya	",
                url: "",
              },
              {
                id: 38,
                name: "test",
                lang: "te",
                title2: "	abhimanyuni vadha	",
                url: "",
              },
              {
                id: 39,
                name: "test",
                lang: "te",
                title2: "	karNuDu iMdraSakticE ghaTOtkacuni caMpuTa	",
                url: "",
              },
              {
                id: 40,
                name: "test",
                lang: "te",
                title2: "	bhImuDu duSSAsanuni guMDelu cIlci netturu trAguTa	",
                url: "",
              },
              {
                id: 41,
                name: "test",
                lang: "te",
                title2: "	arjunuDu karNuni saMhariMcuTa	",
                url: "",
              },
              {
                id: 42,
                name: "test",
                lang: "te",
                title2: "	bhImuDu duryOdhanuni paDagoTTuTa	",
                url: "",
              },
              {
                id: 43,
                name: "test",
                lang: "te",
                title2: "	aSvatthAma niduriMcucunna upapAMDavulanu caMpuTa	",
                url: "",
              },
              {
                id: 44,
                name: "test",
                lang: "te",
                title2: "	caccipuTTina parIkshittunu kRshNuDu bratikiMcuTa	",
                url: "",
              },
              {
                id: 45,
                name: "test",
                lang: "te",
                title2: "	bhIshmuDu dharmarAjuku dharmamulu bOdhiMcuTa	",
                url: "",
              },
              {
                id: 46,
                name: "test",
                lang: "te",
                title2: "	dharmarAju paTTAbhishEkamu	",
                url: "",
              },
            ],
          },
          {
            id: 4,
            name: "బొమ్మల భాగవతం",
            documents: [
              {
                id: 1,
                name: "test",
                lang: "te",
                title2: "	bhakti vEdAMta rasAlaM	",
                url: "",
              },
              {
                id: 2,
                name: "test",
                lang: "te",
                title2: "	purANa tilakaM	",
                url: "",
              },
              {
                id: 3,
                name: "test",
                lang: "te",
                title2: "	parIkshittu	",
                url: "",
              },
              {
                id: 4,
                name: "test",
                lang: "te",
                title2: "	SRMgi SApaM	",
                url: "",
              },
              {
                id: 5,
                name: "test",
                lang: "te",
                title2: "	bhAgavata saptAhaM	",
                url: "",
              },
              { id: 6, name: "test", lang: "te", title2: "	avatArAlu	", url: "" },
              {
                id: 7,
                name: "test",
                lang: "te",
                title2: "	viSvavirAT	",
                url: "",
              },
              {
                id: 8,
                name: "test",
                lang: "te",
                title2: "	sRshTi-vikAsaM	",
                url: "",
              },
              {
                id: 9,
                name: "test",
                lang: "te",
                title2: "	padirakAla sRshTulu	",
                url: "",
              },
              {
                id: 10,
                name: "test",
                lang: "te",
                title2: "	kAlagaNana	",
                url: "",
              },
              {
                id: 11,
                name: "test",
                lang: "te",
                title2: "	varAhamU rti	",
                url: "",
              },
              {
                id: 12,
                name: "test",
                lang: "te",
                title2: "	jayavijayulu	",
                url: "",
              },
              {
                id: 13,
                name: "test",
                lang: "te",
                title2: "	nUrELLa garbhaM	",
                url: "",
              },
              { id: 14, name: "test", lang: "te", title2: "	kapiluDu	", url: "" },
              {
                id: 15,
                name: "test",
                lang: "te",
                title2: "	hiraNyakaSipuDu	",
                url: "",
              },
              {
                id: 16,
                name: "test",
                lang: "te",
                title2: "	brahmavarAlu	",
                url: "",
              },
              {
                id: 17,
                name: "test",
                lang: "te",
                title2: "	prahlAduDu	",
                url: "",
              },
              {
                id: 18,
                name: "test",
                lang: "te",
                title2: "	narasiMhuDu	",
                url: "",
              },
              {
                id: 19,
                name: "test",
                lang: "te",
                title2: "	Aruguru manuvulu	",
                url: "",
              },
              {
                id: 20,
                name: "test",
                lang: "te",
                title2: "	gajEMdruni vaibhavaM	",
                url: "",
              },
              {
                id: 21,
                name: "test",
                lang: "te",
                title2: "	durvAsuni	",
                url: "",
              },
              {
                id: 22,
                name: "test",
                lang: "te",
                title2: "	sAgara madhanaM	",
                url: "",
              },
              {
                id: 23,
                name: "test",
                lang: "te",
                title2: "	kUrmAvatAraM	",
                url: "",
              },
              {
                id: 24,
                name: "test",
                lang: "te",
                title2: "	SrIrAmuDu	",
                url: "",
              },
              {
                id: 25,
                name: "test",
                lang: "te",
                title2: "	jaganmOhini	",
                url: "",
              },
              {
                id: 26,
                name: "test",
                lang: "te",
                title2: "	vaivasvatamanvaMtaraM	",
                url: "",
              },
              {
                id: 27,
                name: "test",
                lang: "te",
                title2: "	mRta saMjIvani	",
                url: "",
              },
              {
                id: 28,
                name: "test",
                lang: "te",
                title2: "	amma AvEdana	",
                url: "",
              },
              { id: 29, name: "test", lang: "te", title2: "	vAmanuDu	", url: "" },
              {
                id: 30,
                name: "test",
                lang: "te",
                title2: "	iMtiMtai vaTuDaMtai	",
                url: "",
              },
              {
                id: 31,
                name: "test",
                lang: "te",
                title2: "	matsyAvakAraM	",
                url: "",
              },
              {
                id: 32,
                name: "test",
                lang: "te",
                title2: "	aMbarIshuDu	",
                url: "",
              },
              {
                id: 33,
                name: "test",
                lang: "te",
                title2: "	paraSurAmuDu	",
                url: "",
              },
              { id: 34, name: "test", lang: "te", title2: "	kucEluDu	", url: "" },
              {
                id: 35,
                name: "test",
                lang: "te",
                title2: "	kRshNuDi katha	",
                url: "",
              },
              {
                id: 36,
                name: "test",
                lang: "te",
                title2: "	kaMsuDi Dau daushTyaM	",
                url: "",
              },
              {
                id: 37,
                name: "test",
                lang: "te",
                title2: "	dEvaki po triLLalO dEvadEvuDu	",
                url: "",
              },
              { id: 38, name: "test", lang: "te", title2: "	pUtana	", url: "" },
              {
                id: 39,
                name: "test",
                lang: "te",
                title2: "	suDigAlilO rAkshasulu	",
                url: "",
              },
              {
                id: 40,
                name: "test",
                lang: "te",
                title2: "	nalla doMga	",
                url: "",
              },
              {
                id: 41,
                name: "test",
                lang: "te",
                title2: "	kRshNayya nOTilO mUDu lOkAlu	",
                url: "",
              },
              {
                id: 42,
                name: "test",
                lang: "te",
                title2: "	molatrADuku rOju	",
                url: "",
              },
              {
                id: 43,
                name: "test",
                lang: "te",
                title2: "	bRMdAvanaMlO	",
                url: "",
              },
              {
                id: 44,
                name: "test",
                lang: "te",
                title2: "	marO iddariki SAstri	",
                url: "",
              },
              {
                id: 45,
                name: "test",
                lang: "te",
                title2: "	kALIya mardhanaM	",
                url: "",
              },
              {
                id: 46,
                name: "test",
                lang: "te",
                title2: "	munikAMtalamuripeM	",
                url: "",
              },
              {
                id: 47,
                name: "test",
                lang: "te",
                title2: "	iMdruni AgrahaM	",
                url: "",
              },
              {
                id: 48,
                name: "test",
                lang: "te",
                title2: "	vENugAnaM	",
                url: "",
              },
              {
                id: 49,
                name: "test",
                lang: "te",
                title2: "	kaMsuni pannAgaM	",
                url: "",
              },
              {
                id: 50,
                name: "test",
                lang: "te",
                title2: "	dhanuryAgaM	",
                url: "",
              },
              {
                id: 51,
                name: "test",
                lang: "te",
                title2: "	ninna kuja-nEDusuMdari	",
                url: "",
              },
              {
                id: 52,
                name: "test",
                lang: "te",
                title2: "	kubjapai kRpAdRshTi	",
                url: "",
              },
              {
                id: 53,
                name: "test",
                lang: "te",
                title2: "	kuvalamA pIDaM	",
                url: "",
              },
              {
                id: 54,
                name: "test",
                lang: "te",
                title2: "	malla yuddhaM	",
                url: "",
              },
              {
                id: 55,
                name: "test",
                lang: "te",
                title2: "	kaMsavadha	",
                url: "",
              },
              {
                id: 56,
                name: "test",
                lang: "te",
                title2: "	sAMdI pani	",
                url: "",
              },
              {
                id: 57,
                name: "test",
                lang: "te",
                title2: "	jarAsaMdha parAbhaM	",
                url: "",
              },
              {
                id: 58,
                name: "test",
                lang: "te",
                title2: "	rukmiNI kaLyANaM	",
                url: "",
              },
              {
                id: 59,
                name: "test",
                lang: "te",
                title2: "	satyabhAma	",
                url: "",
              },
              {
                id: 60,
                name: "test",
                lang: "te",
                title2: "	narakAsura saMhAraM	",
                url: "",
              },
              {
                id: 61,
                name: "test",
                lang: "te",
                title2: "	usha - aniruddhuDu	",
                url: "",
              },
              {
                id: 62,
                name: "test",
                lang: "te",
                title2: "	kRshNalIlA vaibhavaM	",
                url: "",
              },
              {
                id: 63,
                name: "test",
                lang: "te",
                title2: "	munula SApaM	",
                url: "",
              },
              {
                id: 64,
                name: "test",
                lang: "te",
                title2: "	yugadharmAlu	",
                url: "",
              },
            ],
          },

          {
            id: 5,
            name: "కృష్ణ లీలలు",
            documents: [
              {
                id: 1,
                name: "test",
                lang: "te",
                title2: "	1 SrIkRshNa jananaM	",
                url: "",
              },
              {
                id: 2,
                name: "test",
                lang: "te",
                title2: "	2 pUtanavadha	",
                url: "",
              },
              {
                id: 3,
                name: "test",
                lang: "te",
                title2: "	3 maddi mAnulu	",
                url: "",
              },
              {
                id: 4,
                name: "test",
                lang: "te",
                title2: "	4 bRMdAvanaMlO viMtalu	",
                url: "",
              },
              {
                id: 5,
                name: "test",
                lang: "te",
                title2: "	5 kALiya mardanaM	",
                url: "",
              },
              {
                id: 6,
                name: "test",
                lang: "te",
                title2: "	6 gOvardha nOddaraNaM	",
                url: "",
              },
              {
                id: 7,
                name: "test",
                lang: "te",
                title2: "	7 kaMsuni pannAgaM	",
                url: "",
              },
              {
                id: 8,
                name: "test",
                lang: "te",
                title2: "	8 kaMsa vadha	",
                url: "",
              },
              {
                id: 9,
                name: "test",
                lang: "te",
                title2: "	9 guru dakshiNa	",
                url: "",
              },
              {
                id: 10,
                name: "test",
                lang: "te",
                title2: "	10 dvArakA nagara nirmANaM	",
                url: "",
              },
              {
                id: 11,
                name: "test",
                lang: "te",
                title2: "	11 rukmiNI kaLyANaM	",
                url: "",
              },
              {
                id: 12,
                name: "test",
                lang: "te",
                title2: "	12 satyabhAma svamaMtaka maNi	",
                url: "",
              },
              {
                id: 13,
                name: "test",
                lang: "te",
                title2: "	13 ushA pariNayaM	",
                url: "",
              },
              {
                id: 14,
                name: "test",
                lang: "te",
                title2: "	14 narakAsura vadha	",
                url: "",
              },
              {
                id: 15,
                name: "test",
                lang: "te",
                title2: "	15 maroka vAsu dEvuDu	",
                url: "",
              },
              {
                id: 16,
                name: "test",
                lang: "te",
                title2: "	16 jarAsaMdhuDi vadha	",
                url: "",
              },
              {
                id: 17,
                name: "test",
                lang: "te",
                title2: "	17 SiSupAla vadha	",
                url: "",
              },
              {
                id: 18,
                name: "test",
                lang: "te",
                title2: "	18 kucElOpAkhyAnaM	",
                url: "",
              },
              {
                id: 19,
                name: "test",
                lang: "te",
                title2: "	19 maroka adbhutalIla	",
                url: "",
              },
              {
                id: 20,
                name: "test",
                lang: "te",
                title2: "	20 draupadi mAna saMrakshaNa	",
                url: "",
              },
              {
                id: 21,
                name: "test",
                lang: "te",
                title2: "	21 bhArata yuddhaMlO kRshNuni pAtra	",
                url: "",
              },
              {
                id: 22,
                name: "test",
                lang: "te",
                title2: "	22 yAdava kulaMlO musalaM	",
                url: "",
              },
            ],
          },

          {
            id: 6,
            name: "పంచ తంత్ర కథలు",
            documents: [
              {
                id: 1,
                name: "test",
                lang: "te",
                title2: "	1 paricayaM	",
                url: "",
              },
              {
                id: 2,
                name: "test",
                lang: "te",
                title2: "	2 mitralAbhaM	",
                url: "",
              },
              {
                id: 3,
                name: "test",
                lang: "te",
                title2: "	3 hiraNyakuDu	",
                url: "",
              },
              {
                id: 4,
                name: "test",
                lang: "te",
                title2: "	4 citrAMguDu	",
                url: "",
              },
              {
                id: 5,
                name: "test",
                lang: "te",
                title2: "	5 durASa panikirAdu	",
                url: "",
              },
              {
                id: 6,
                name: "test",
                lang: "te",
                title2: "	6 pErASa prANAMtakaM	",
                url: "",
              },
              {
                id: 7,
                name: "test",
                lang: "te",
                title2: "	7 evarU amAyakulu kAru	",
                url: "",
              },
              {
                id: 8,
                name: "test",
                lang: "te",
                title2: "	8 jittulamAri nakka	",
                url: "",
              },
              {
                id: 9,
                name: "test",
                lang: "te",
                title2: "	9 guNamA? kulamA?	",
                url: "",
              },
              {
                id: 10,
                name: "test",
                lang: "te",
                title2: "	10 mitrabhEdaM	",
                url: "",
              },
              {
                id: 11,
                name: "test",
                lang: "te",
                title2: "	11 kOticEshTalu	",
                url: "",
              },
              {
                id: 12,
                name: "test",
                lang: "te",
                title2: "	12 AshADabhUti	",
                url: "",
              },
              {
                id: 13,
                name: "test",
                lang: "te",
                title2: "	13 upAyaM kathalu	",
                url: "",
              },
              {
                id: 14,
                name: "test",
                lang: "te",
                title2: "	14 kAki telivi	",
                url: "",
              },
              {
                id: 15,
                name: "test",
                lang: "te",
                title2: "	15 upAyaMlO apAyaM	",
                url: "",
              },
              {
                id: 16,
                name: "test",
                lang: "te",
                title2: "	16 verri koMgalu	",
                url: "",
              },
              {
                id: 17,
                name: "test",
                lang: "te",
                title2: "	17 laukyaM teliyani oMTe	",
                url: "",
              },
              {
                id: 18,
                name: "test",
                lang: "te",
                title2: "	18 dushTabuddhi	",
                url: "",
              },
              {
                id: 19,
                name: "test",
                lang: "te",
                title2: "	19 mUrkhulu	",
                url: "",
              },
              {
                id: 20,
                name: "test",
                lang: "te",
                title2: "	20 mUDu cEpalu	",
                url: "",
              },
              {
                id: 21,
                name: "test",
                lang: "te",
                title2: "	21 bhayaM maMcidikAdu	",
                url: "",
              },
              {
                id: 22,
                name: "test",
                lang: "te",
                title2: "	22 DiMDimamu	",
                url: "",
              },
              {
                id: 23,
                name: "test",
                lang: "te",
                title2: "	23 peddavAritO snEhaM	",
                url: "",
              },
              {
                id: 24,
                name: "test",
                lang: "te",
                title2: "	24 vaDraMgi siMhaM	",
                url: "",
              },
              {
                id: 25,
                name: "test",
                lang: "te",
                title2: "	25 tAnu tIsina gOtilO	",
                url: "",
              },
              {
                id: 26,
                name: "test",
                lang: "te",
                title2: "	26 bhalE jaMtuvulu	",
                url: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Sanskrit Classes",
    subjects: [
      {
        id: 3,
        name: "IGCSE",
        books: [
          {
            id: 1,
            name: "Rama Stories",
            documents: [
              {
                id: 1,
                lang: "sa",
                title2: "rAjA daSaratha@h bAlakaM bhrAntyA hanti",
                name: "King Dasaratha Kills a Boy by Mistake",
                url: "1SWaBuzqbjJH8HkVFqpNVZUswnNtN7nf7",
              },
              {
                id: 2,
                lang: "sa",
                title2: "taaTakaayaa@h vadhaa",
                name: "Rama and Lakshmana Kill the Demoness Tataka",
                url: "1GkB1ab-eKvARz4IZbqhaTIgHgaTBS7et",
              },
              {
                id: 3,
                lang: "sa",
                title2: "sItaaraamayO@h vivaaha@h",
                name: "Rama Wins Sita as His Wife",
                url: "1_dIDVeOBEiCkYaiY0UUCN0EJL_LPnGmv",
              },
              {
                id: 4,
                lang: "sa",
                title2: "krUraa kaikEyI svasya icCAdvayaM Agrahayati",
                name: "The Cruel Kaikeyi Demands Her Two Wishes",
                url: "1ZYrZsC_2DqPKmalMoYMbbhRLN18s54uI",
              },
              {
                id: 5,
                name: "	Ravana's Sister is Mutilated by Lakshmana	",
                lang: "sa",
                title2: "	rAvaNasya bhaginI lakshmaNEna vikRtA bhavati	",
                url: "1uRUjfBS6H_iLmsIAjZ9jvDdDMZC2RPT_",
              },
              {
                id: 6,
                name: "	Marica's Magic Helps Ravana Kidnap Sita	",
                lang: "sa",
                title2:
                  "	mArIca@h maayaaM kRtvA rAvaNasya sItAyA@h apaharaNaM kartuM sAhAyyaM karOti	",
                url: "1Mfialj23aV4DqEtIQHlKz3wFCCnWJDN6",
              },
              {
                id: 7,
                name: "	Ravana Cuts Off Jatayu's Wings	",
                lang: "sa",
                title2: "	rAvaNa@h jaTAyO@h pakshaM Cinnati	",
                url: "1NViIec4h_fuc4WZ5eyu-kZVabwW0dQ-Z",
              },
              {
                id: 8,
                name: "	Rama Grieving for Sita, Finds Jatayu Dying	",
                lang: "sa",
                title2: "	rAma@h sItAM SOcan, jaTAyuM mriyamANaM paSyati	",
                url: "19NW3ShY_pb2iCZrOZ5BPhzORF_xVnZ_B",
              },
              {
                id: 9,
                name: "	A Monster Tries to Eat Rama and Lakshmana	",
                lang: "sa",
                title2: "	rAkshasa@h rAmalakshmaNaM ca bhakshayitum prayatatE	",
                url: "1YkK1ls6mDT0i1d9ukXkeqDP2s3VmO-Vo",
              },
              {
                id: 10,
                name: "	Ravana Threatens to Eat Sita for Breakfast	",
                lang: "sa",
                title2:
                  "	rAvaNa@h prAta@hbhOjArthaM sItAM khAditum dhamakI dadAti	",
                url: "",
              },
              {
                id: 11,
                name: "	Rama is Accused of Cheating in Battle	",
                lang: "sa",
                title2: "	rAma@h yuddhE va~ncanasya ArOpa@h asti	",
                url: "",
              },
              {
                id: 12,
                name: "	Lakshmana Breaks Up Sugriva's Wild Party	",
                lang: "sa",
                title2: "	lakshmaNa@h sugrIvasya vanyapakshaM bha~mgayati	",
                url: "",
              },
              {
                id: 13,
                name: "	Hanuman Jumps Over the Ocean	",
                lang: "sa",
                title2: "	hanumAna@h samudrasya upari kUrdati	",
                url: "",
              },
              {
                id: 14,
                name: "	Hanuman Sets Lanka on Fire with his Tail	",
                lang: "sa",
                title2: "	hanumAna@h pucCEna la~mkAM agnim ayacCati	",
                url: "",
              },
              {
                id: 15,
                name: "	Rama Defeats Ravana	",
                lang: "sa",
                title2: "	rAma@h rAvaNaM parAjayati	",
                url: "",
              },
              {
                id: 16,
                name: "	Sita Ordeal by Fire	",
                lang: "sa",
                title2: "	agni dvArA sItA praviSati	",
                url: "",
              },
            ],
          },
          {
            id: 2,
            name: "Krishna Stories",
            documents: [
              {
                id: 1,
                name: "	Krishna's Mother Yasoda, Sees All Things in His Mouth	",
                lang: "sa",
                title2: "	kRshNasya mAtA yasOdA, mukhE sarvaM paSyati	",
                url: "",
              },
              {
                id: 2,
                name: "	Yasoda Cannot Bind the Limitless Krishna	",
                lang: "sa",
                title2: "	yasOda@h asImaM kRshNaM na bAdhituM SaknOti	",
                url: "",
              },
              {
                id: 3,
                name: "	The Call of Krishna Flute	",
                lang: "sa",
                title2: "	kRshNavENunA AhvAna	",
                url: "",
              },
              {
                id: 4,
                name: "	Krishna Overcomes the Serpent Demon	",
                lang: "sa",
                title2: "	kRshNa@h nAgadAnavaM parAbhavati	",
                url: "",
              },
              {
                id: 5,
                name: "	Putana Tries to Poison Krishna	",
                lang: "sa",
                title2: "	pUtanA kRshNaM vishaM kartuM prayatatE	",
                url: "",
              },
              {
                id: 6,
                name: "	The Demon Agha Swallows Krishna	",
                lang: "sa",
                title2: "	rAkshasa Agha@h kRshNaM nigalati	",
                url: "",
              },
              {
                id: 7,
                name: "	The Whirlwind Demon	",
                lang: "sa",
                title2: "	bhaMvaradAnava@h	",
                url: "",
              },
              {
                id: 8,
                name: "	Krishna Releases the Sons of Kubera	",
                lang: "sa",
                title2: "	kRshNa@h kubEraputrAn mu~ncati |	",
                url: "",
              },
              {
                id: 9,
                name: "	Brahma Hides the Cowherd Boys and the Calves	",
                lang: "sa",
                title2: "	brahma gOpabAlakAn vatsAn ca gOpayati |	",
                url: "",
              },
              {
                id: 10,
                name: "	The Lifting of the Mountain	",
                lang: "sa",
                title2: "	parvatasya utthApanam	",
                url: "",
              },
              {
                id: 11,
                name: "	The Wrestling Match	",
                lang: "sa",
                title2: "	mallayuddham	",
                url: "",
              },
              {
                id: 12,
                name: "	Kamsa's Destruction	",
                lang: "sa",
                title2: "	kAMSasya vinASa@h	",
                url: "",
              },
            ],
          },
          {
            id: 3,
            name: "Mahabharata Stories",
            documents: [
              {
                id: 1,
                name: "	Bhishma carries off three princesses	",
                lang: "sa",
                title2: "	bhIshma@h trINi rAjakanyAni vahati	",
                url: "",
              },
              {
                id: 2,
                name: "	The Pandavas are born	",
                lang: "sa",
                title2: "	pANDavA@h jAyantE	",
                url: "",
              },
              {
                id: 3,
                name: "	King Dushyanta marries Sakuntala	",
                lang: "sa",
                title2: "	rAjA dushyanta@h sakuntalasya vivAhaM karOti	",
                url: "",
              },
              {
                id: 4,
                name: "	A vulture tests King Sibi's virtue	",
                lang: "sa",
                title2:
                  "	Eka@h gRdhra@h rAj~na@h sibisya guNasya parIkshaNaM karOti	",
                url: "",
              },
              {
                id: 5,
                name: "	Arjuna defeats Karna	",
                lang: "sa",
                title2: "	arjuna@h karNaM parAjayati	",
                url: "",
              },
              {
                id: 6,
                name: "	Krishna is shot by a hunter	",
                lang: "sa",
                title2: "	kRshNa@h lubdhakEna vidArita@h bhavati	",
                url: "",
              },
            ],
          },
          {
            id: 4,
            name: "Hitopadesha Stories",
            documents: [
              {
                id: 1,
                name: "	Introduction to the Hitopadesa	",
                lang: "sa",
                title2: "	hitOpadESasya paricaya@h	",
                url: "",
              },
              {
                id: 2,
                name: "	King Sudarsha asks an assembly of the wise for help	",
                lang: "sa",
                title2: "	rAjA sudarSa@h paNDitAnAM sabhAM sahAyaM yAcatE |	",
                url: "",
              },
              {
                id: 3,
                name: "	The old tiger and the traveller - part 1	",
                lang: "sa",
                title2: "	vRddhavyAghra@h pathika@h ca - bhAga@h 1	",
                url: "",
              },
              {
                id: 4,
                name: "	The old tiger and the traveller - part 2	",
                lang: "sa",
                title2: "	vRddhavyAghra@h pathika@h ca - bhAga 2	",
                url: "",
              },
              {
                id: 5,
                name: "	The old tiger and the traveller - part 3	",
                lang: "sa",
                title2: "	vRddhavyAghra@h pathika@h ca - bhAga@h 3	",
                url: "",
              },
              {
                id: 6,
                name: "	The brahmin and his faithful ichneumon - part 1	",
                lang: "sa",
                title2: "	brAhmaNastasya SraddhA icnEumOna - bhAga 1	",
                url: "",
              },
              {
                id: 7,
                name: "	The brahmin and his faithful ichneumon - part 2	",
                lang: "sa",
                title2: "	brAhmaNastasya SraddhA icnEumOna - bhAga 2	",
                url: "",
              },
            ],
          },
          {
            id: 5,
            name: "Epic Civilization",
            documents: [
              {
                id: 1,
                name: "	Basic Metaphysical Teachings	",
                lang: "sa",
                title2: "		",
                url: "",
              },
              { id: 2, name: "	The Cosmos	", lang: "sa", title2: "		", url: "" },
              {
                id: 3,
                name: "	Important Texts	",
                lang: "sa",
                title2: "		",
                url: "",
              },
              { id: 4, name: "	Divine Beings	", lang: "sa", title2: "		", url: "" },
              {
                id: 5,
                name: "	Human Life and its Purpose	",
                lang: "sa",
                title2: "		",
                url: "",
              },
            ],
          },
          {
            id: 6,
            name: "Bhagavadgita",
            documents: [
              {
                id: 1,
                name: "	Chapter 1 v 36	",
                lang: "sa",
                title2: "	nihatya dhaartaraashTraanna@h	",
                url: "",
              },
              {
                id: 2,
                name: "	Chapter 1 v 47	",
                lang: "sa",
                title2: "	Evamuktvaarjuna@h	",
                url: "",
              },
              {
                id: 3,
                name: "	Chapter 2 v 3	",
                lang: "sa",
                title2: "	klaibyaM maa sma	",
                url: "",
              },
              {
                id: 4,
                name: "	Chapter 2 v 22	",
                lang: "sa",
                title2: "	vaasaaMsi jIrNAni	",
                url: "",
              },
              {
                id: 5,
                name: "	Chapter 2 v 48	",
                lang: "sa",
                title2: "	yOgastha@h kuru	",
                url: "",
              },
              {
                id: 6,
                name: "	Chapter 2 v 65	",
                lang: "sa",
                title2: "	prasaadE sarvadu@khaanaaM	",
                url: "",
              },
              {
                id: 7,
                name: "	Chapter 3 v 19	",
                lang: "sa",
                title2: "	tasmaadasakta@h satatam	",
                url: "",
              },
              {
                id: 8,
                name: "	Chapter 3 v 21	",
                lang: "sa",
                title2: "	yadyadaacarati SrEShaTha@h	",
                url: "",
              },
              {
                id: 9,
                name: "	Chapter 3 v 30	",
                lang: "sa",
                title2: "	mayi sarvaaNi karmaaNi	",
                url: "",
              },
              {
                id: 10,
                name: "	Chapter 3 v 35	",
                lang: "sa",
                title2: "	SrEyaansvadharmO viguNa@h	",
                url: "",
              },
              {
                id: 11,
                name: "	Chapter 4 v 10	",
                lang: "sa",
                title2: "	vItaraagabhayakrOdhaa	",
                url: "",
              },
              {
                id: 12,
                name: "	Chapter 4 v 19	",
                lang: "sa",
                title2: "	yasya sarvE samaaraMbhaa@h	",
                url: "",
              },
              {
                id: 13,
                name: "	Chapter 5 v 10	",
                lang: "sa",
                title2: "	brahmaNyaadhyaaya karmaaNi	",
                url: "",
              },
              {
                id: 14,
                name: "	Chapter 9 v 4	",
                lang: "sa",
                title2: "	mayaa tatamidaM sarvaM	",
                url: "",
              },
              {
                id: 15,
                name: "	Chapter 9 v 7	",
                lang: "sa",
                title2: "	sarvabhUtaani kautEya	",
                url: "",
              },
              {
                id: 16,
                name: "	Chapter 9 v 26	",
                lang: "sa",
                title2: "	patraM pushpaM phalaM	",
                url: "",
              },
              {
                id: 17,
                name: "	Chapter 10 v 3	",
                lang: "sa",
                title2: "	yO maamajamanaadiM ca	",
                url: "",
              },
              {
                id: 18,
                name: "	Chapter 15 v 12	",
                lang: "sa",
                title2: "	yadaadityagataM tEjO	",
                url: "",
              },
              {
                id: 19,
                name: "	Chapter 18 v 53	",
                lang: "sa",
                title2: "	ahaMkaaraM balaM darpaM	",
                url: "",
              },
              {
                id: 20,
                name: "	Chapter 18 v 56	",
                lang: "sa",
                title2: "	sarvakarmANyapi sadaa	",
                url: "",
              },
            ],
          },
          {
            id: 7,
            name: "Workbook Part-1",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 8,
            name: "Workbook Part-2",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 9,
            name: "Nama Rupani (Nouns)",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 10,
            name: "Kriya Rupani (Verbs)",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 11,
            name: "Previous Exam Papers",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 12,
            name: "Learn Sanskrit 30 days",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
        ],
      },
      {
        id: 4,
        name: "Basics",
        books: [
          {
            id: 4,
            name: "Stories",
            documents: [
              {
                id: 1,
                name: "Clever Crow",
                lang: "sa",
                title2: "catura@h kAka@h",
                url: "1SfMeDNptpN097gKVWME-nYAhFxTycdEU",
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Raghuvamsam",
        books: [
          {
            id: 4,
            name: "12th Sarga",
            documents: [
              {
                id: 5,
                name: "12th Sarga 72-90",
                lang: "sa",
                title2: "dvAdaSa@h sarga@h 72-90",
                url: "1ppStJL_V4-I2WQ_b0td1CJyHg-3Kabw8",
              },
            ],
          },
        ],
      },
    ],
  },
];

const TaragatiSelector = ({ loadFileWithId }: Props) => {
  const [selectedTaragati, setSelectedTaragati] = useState<Taragati | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  let ett: EngToTelService = new EngToTelService();

  return (
    <>
      <div className="m3">
        {/* Taragati Selection */}
        <div className="btn-group mb-3">
          <button
            key={0}
            className={`btn ${
              selectedTaragati?.id === 0
                ? "btn-success"
                : "btn-outline-secondary"
            }`}
            onClick={() => {
              setSelectedTaragati(null);
              setSelectedSubject(null);
              setSelectedBook(null);
            }}
          >
            {" "}
            Clear{" "}
          </button>
          {data.map((taragati) => (
            <button
              key={taragati.id}
              className={`btn ${
                selectedTaragati?.id === taragati.id
                  ? "btn-success"
                  : "btn-outline-secondary"
              }`}
              onClick={() => {
                setSelectedTaragati(taragati);
                setSelectedSubject(null);
                setSelectedBook(null);
              }}
            >
              {taragati.name}
            </button>
          ))}
        </div>
        {/* Subject Selection */}
        {selectedTaragati && (
          <>
            <br></br>
            <div className="btn-group mb-3">
              {selectedTaragati.subjects.map((subject) => (
                <button
                  key={subject.id}
                  className={`btn ${
                    selectedSubject?.id === subject.id
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setSelectedBook(null);
                  }}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </>
        )}
        <div className="row" style={{ marginBottom: "5px" }}>
          <div className="col-4">
            <div className="mt-4">
              {/* Book Selection */}
              {selectedSubject && (
                <>
                  <h2>Select Book</h2>
                  <div className="d-flex flex-column gap-2">
                    {selectedSubject.books.map((book) => (
                      <button
                        key={book.id}
                        className={`btn ${
                          selectedBook?.id === book.id
                            ? "btn-warning"
                            : "btn-outline-secondary"
                        } w-100`}
                        onClick={() => setSelectedBook(book)}
                      >
                        {book.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-8">
            {/* Documents Table */}
            {selectedBook && (
              <>
                <h2>Documents</h2>
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBook.documents.map((doc) => (
                      <tr key={doc.id}>
                        <td>{doc.id}</td>
                        <td>{doc.name}</td>
                        {doc.lang == "sa" && (
                          <td className="div-hindigen fontup1">
                            {ett.getStringInSanskrit(doc.title2)}
                          </td>
                        )}
                        {doc.lang != "sa" && (
                          <td className="div-telugugen fontup1">
                            {ett.getStringInTelugu(doc.title2)}
                          </td>
                        )}
                        <td>
                          {doc.url ? (
                            <a
                              href="#"
                              className="btn btn-sm btn-info"
                              onClick={(e) => {
                                e.preventDefault(); // Prevent default link behavior
                                loadFileWithId(doc.url);
                              }}
                            >
                              Load in Preview
                            </a>
                          ) : (
                            <span className="text-muted">No Data</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaragatiSelector;
