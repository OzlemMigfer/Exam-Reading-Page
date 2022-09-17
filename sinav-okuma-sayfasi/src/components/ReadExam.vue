<template>
    <!-- <h3>Read Exam Page</h3> -->
    <div id="app">
        <!-- cascading select dropdown -->
        <div class="cascading-select-dropdown">
            <div class="dropdown">
                <span>Kullanıcı:</span>
                <select id="userSelect" v-model="selectedUser" :required="true">
                    <option value="">Kullanıcıları Seçiniz</option>
                    <option v-for="(user,index) in users" :key="user.id" :value="index">{{ index }}{{ user.name }}</option>
                </select>
            </div>
            <div class="dropdown">
                <span>Sınıf Seviyesi:</span>
                <select id="gradeSelect" v-model="selectedGrade" :disabled="grades.length == 0" :required="true">
                    <option value="">Sınıf Seviyesi Seçiniz</option>
                    <option v-for="(grade,gradeIndex) in grades" :key="grade.id" :value="gradeIndex">{{ gradeIndex }}{{ grade.name }}</option>
                </select>
            </div>
            <div class="dropdown">
                <span>Sınıf Şubesi:</span>
                <select id="branchSelect" v-model="selectedBranch" :disabled="branches.length == 0" :required="true">
                    <option value="">Sınıf Şubesi Seçiniz</option>
                    <option v-for="(branch,branchIndex) in branches" :key="branch.id" :value="branchIndex">{{ branchIndex }}{{ branch.name }}</option>
                </select>
            </div>
            <div class="dropdown">
                <span>Aktif Sınavlar:</span>
                <select id="examSelect" v-model="selectedExam" :disabled="exams.length == 0">
                    <option value="">Sınav Seçiniz</option>
                    <option v-for="(branchIndex) in exams" :key="branchIndex.id">{{ branchIndex }}{{ branchIndex.name }}</option>
                </select>
            </div>
        </div>
        <div class="input d-flex justify-center mt-n9">
            <input 
                v-show="true" 
                accept=".txt"
                ref="doc"
                type="file"          
            />
        </div>
        <!-- txt dosyası yüklemek/görüntülemek -->
        <div class="allButtons">
            <div class="buttons ml-auto">
                <div class="mt-3 d-flex flex-column-reverse">
                    <v-btn 
                        class="mt-4" 
                        color="primary" 
                        @click="saveToJson" 
                        width="130px"
                    >
                        Kaydet
                    </v-btn>
                    <v-btn 
                        class="mt-4" 
                        color="primary" 
                        width="130px"
                        @click="checkAnswer"
                    >
                        Değerlendir
                    </v-btn>
                    <v-btn 
                        class="mr-5"
                        id="upload"
                        color="primary" 
                        width="130px" 
                        @click="importTxt"
                    >
                        Oku
                    </v-btn>
                </div>
            </div>
        </div>

        <!-- yeni tablo -->
        <div class="dataTable ml-7 mt-n16">
            <v-card>
                <v-data-table            
                    id="upload"
                    :headers="headers"
                    :items="itemStudents"
                    class="elevation-1"
                >   
                </v-data-table>
            </v-card>
        </div>
        <template>
            <div id="jsonField"></div>
        </template>       
    </div>
</template>


<script>
export default{
    jsonData: JSON,
    data: () => ({
        //for dropdown
        users: {
            "KullanıcıA":{
                "1":{
                    "A":["SINAV1","SINAV2"],
                    "E":["SINAV9","SINAV10"]
                },
                "5":{
                    "B":["SINAV3","SINAV4"]
                }
            },
            "KullanıcıB":{
                "3":{
                    "C":["SINAV5","SINAV6"]
                },
                "7":{
                    "D":["SINAV7", "SINAV8"]
                }
            }
        },
        grades:[],
        branches:[],
        exams:[],
        studentData:[],
        itemStudents:[],
        selectedUser:"",
        selectedGrade:"",
        selectedBranch:"",
        selectedExam:"",

        getJsonData:[
            {
                "AdSoyad":[0,19],
                "TC":[19,30],
                "Numara":[31,36],
                "Sınıf":[36,38],
                "Şube":[38,41],
                "CevapAnahtarı":[41,85],
            },
            // {
            //     "AdSoyad":[0,19],
            //     "Numara":[31,36],
            //     "Sınıf":[36,38],
            //     "Şube":[38,41],
            //     "CevapAnahtarı":[41,82]
            // }
        ],

        activeExams:[
            {
                examCode:"100",
                examName:"SINAV1",
                examDate:"05.06.2022",
                opticNumber:"1002",
                answerKey:"BACDEEEACCADAEDBCAACEBDDDEABCADCCEDAEBCC"
            },
            {
                examCode:"101",
                examName:"SINAV3",
                examDate:"30.08.2022",
                opticNumber:"1050",
                answerKey:"ABCDEAEACCADCEEBCAACEBDADEDBCDDCAEDEEBCB"
            },
            {
                examCode:"102",
                examName:"SINAV5",
                examDate:"19.07.2022",
                opticNumber:"1004",
                answerKey:"CCCCEAEACCADEEDBCAACEBDADEABCEDCCEDBEBCB"
            },
            {
                examCode:"103",
                examName:"SINAV7",
                examDate:"21.12.2022",
                opticNumber:"1007",
                answerKey:"DBABEAEACAADAEDBCDACEBDEDEABAADCCEDADBCB"
            },
            {
                examCode:"104",
                examName:"SINAV9",
                examDate:"13.02.2022",
                opticNumber:"1024",
                answerKey:"ABCDDAEDCBABBCAEDEADDACADBEECDBADAECBBAE"
            },
        ],

        students:[
            {
                id:1,
                name:"Ayşe Korkmaz",
                tc:"11554458748",
                number:"123",
                userGroup:"KullanıcıA",
                class:"1",
                branchName:"A",
                examName:"SINAV1",
                point:""
            },
            {
                id:2,
                name:"Ali Sefer",
                tc:"10557188401",
                number:"456",
                userGroup:"KullanıcıA",
                class:"5",
                branchName:"B",
                examName:"SINAV3",
                point:""
            },
            {
                id:3,
                name:"Ceylan Gül",
                tc:"11451108743",
                number:"789",
                userGroup:"KullanıcıB",
                class:"3",
                branchName:"C",
                examName:"SINAV5",
                point:""
            },
            {
                id:4,
                name:"Hulusi Doğru",
                tc:"12584520730",
                number:"102",
                userGroup:"KullanıcıB",
                class:"1",
                branchName:"D",
                examName:"SINAV1",
                point:""
            }
        ],

        //txt table
        headers: [
            //getJsonData dan key ler geldi yerleşti
        ],

        // txt
        file: null,
        content: [],
    }),
    computed:{
        //for edit-dialog
        formTitle(){
            return this.editedIndex === -1 ? 'Yeni Öğe' : 'Öğeyi Düzenle'
        },
    },
    watch: {
        //for edit-dialog
        dialog(val){
            val || this.close()
        },
        dialogDelete(val){
            val || this.closeDelete()
        },
        //dropdowns
        selectedUser: function() {
            this.grades=[];
            this.branches=[];
            this.exams=[];
            this.selectedGrade="";
            this.selectedBranch="";
            this.selectedExam="";

            if(this.selectedUser.length > 0){
                this.grades = this.users[this.selectedUser]
            }
        },
        selectedGrade: function() {
            this.branches=[];
            this.exams=[];
            this.selectedBranch="";
            this.selectedExam="";

            if(this.selectedGrade.length > 0){
                this.branches = this.users[this.selectedUser][this.selectedGrade]
            }
        },
        selectedBranch: function() {
            this.exams=[];
            this.selectedExam="";

            if(this.selectedBranch.length > 0){
                this.exams = this.users[this.selectedUser][this.selectedGrade][this.selectedBranch]
            }
        }
    },
    methods: {
        importTxt(){
            this.file = this.$refs.doc.files[0];
            const reader = new FileReader();
            if(this.file.name.includes(".txt")){
                reader.onload = (res) => {
                    this.content = res.target.result;
                    this.getStudentsData();
                };
                reader.readAsText(this.file);
                
            }else{
                this.content = "check the console for file output";           
            }
        },
        getStudentsData(){   
            let lines = this.content.split('\n');
            for(let line = 0; line < lines.length; line++){
                var allLine = lines[line];

                for(let k=0;k<this.getJsonData.length;k++){
                    var AdSoyad=allLine.slice(this.getJsonData[k].AdSoyad[0],this.getJsonData[k].AdSoyad[1]);
                    var TC=allLine.slice(this.getJsonData[k].TC[0],this.getJsonData[k].TC[1]);
                    var Numara=allLine.slice(this.getJsonData[k].Numara[0],this.getJsonData[k].Numara[1]);
                    var Sınıf=allLine.slice(this.getJsonData[k].Sınıf[0],this.getJsonData[k].Sınıf[1]);
                    var Şube=allLine.slice(this.getJsonData[k].Şube[0],this.getJsonData[k].Şube[1]);
                    var CevapAnahtarı=allLine.slice(this.getJsonData[k].CevapAnahtarı[0],this.getJsonData[k].CevapAnahtarı[1]);

                    //Seçilen sınıfa göre tabloya veri gönderildi
                    for(let i=0;i<Sınıf.length;i++){
                        if(Sınıf[i] == this.selectedGrade){
                            this.itemStudents.push({AdSoyad,TC,Numara,Sınıf,Şube,CevapAnahtarı});
                        }
                    }
                }
            } 
            //tablo başlıkları için tek tek alınan json keys leri
            for(let k=0;k<this.getJsonData.length;k++){
                const keys = Object.keys(this.getJsonData[k]);
                for(let i=0;i<keys.length;i++){
                    this.headers.push({text:keys[i], value:keys[i]});                   
                }
            } 
            this.headers.push({text:"Puan" , value:"Puan"});       
        },
        checkAnswer(){             
            this.itemStudents.forEach((key)=>{
                var answers = key.CevapAnahtarı;//tablodaki tüm cevap anahtarları--öğrencilerin
                
                var answerClass1_1 = answers.slice(0,20);//her bir öğrenci cevaplarının ilk 20 soru cevabı-tarih
                var answerClass1_2 = answers.slice(20,40);//-coğrafya son 20 soru cevabı öğrencinin

                // console.log("Öğrenci tarih :",answerClass1_1,"------","Öğrenci Coğrafya :",answerClass1_2);

                this.activeExams.forEach((value)=>{
                    if(this.selectedExam == value.examName){
                        var keyExam1_1 = value.answerKey.slice(0,20);
                        var keyExam1_2 = value.answerKey.slice(20,40);

                        // console.log("CAnahtar Tarih :",keyExam1_1,"------","CAnahtar Coğrafya :",keyExam1_2);
 
                        var pointClass1_1 = 0, pointClass1_2 = 0, totalPoint = 0;
                        for(let i =0;i<=keyExam1_1.length;i++){
                            if(answerClass1_1[i] == keyExam1_1[i]){
                               var point1 = pointClass1_1++;
                               var fullPoint1 = point1*(1.33);//tarih puanı
                            }
                            if(answerClass1_2[i] == keyExam1_2[i]){
                               var point2 = pointClass1_2++;
                               var fullPoint2 = point2*(1.34);//coğrafya puanı
                            }
                            totalPoint = fullPoint1 + fullPoint2;
                        }       
                        
                        console.log("puan tarih :",fullPoint1);
                        console.log("puan coğrafya :",fullPoint2);
                        console.log("puan toplam :",totalPoint.toFixed(2));
                        var Puan = totalPoint.toFixed(2);
                    } 
                    this.itemStudents.push({Puan});
                });       
            });
            
        },
        saveToJson(){
            this.jsonData = JSON.stringify(this.studentData);
            document.getElementById('jsonField').innerHTML = this.jsonData;
        },
        addAutoSortNumbers(){
            let no = 1;
            this.studentData.forEach((key) => {
                key.sıra = no;
                no++;
            });
        },
    },
};
</script>

<style>
.cascading-select-dropdown{
  margin-top: 30px;
}
.dropdown {
  display: inline-flex;
  margin-left:30px;
  padding: 10px 0px;
  border-bottom: 1px solid #DDD;
}
.dropdown span {
    display:inline-block;
}
.data-table{
    margin-right: 32px
}
.pg{
    display: block;
}
.dataTable{
    max-width: 84%;
}
.buttons{
    max-width: 11%;
    margin-top: -40px;
    margin-left: 30px;
}
.input{
    margin-left: 60% ;
}
</style>