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
                    <option v-for="(branchIndex) in exams" :key="branchIndex.id">{{ branchIndex }}{{ branchIndex.id }}</option>
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
        <div class="table-buttons">
            <div class="buttons ml-auto">
                <div class="mt-3 d-flex flex-column-reverse">
                    <v-btn class="mt-4" color="primary" @click="$refs.doc.click()" width="130px">
                        Kaydet
                    </v-btn>
                    <v-btn 
                        class="mt-4" 
                        color="primary" 
                        @click="writeToTableExam" 
                        width="130px">
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
                item-key="number"
                :headers="headers"
                :items="students"
            > 
                <template v-slot:[`item.number`]="{ item }">
                    {{ writeToTableNumber(item) }}
                </template>
                <template v-slot:[`item.name`]="{ item }">
                    {{ writeToTableName(item) }}
                </template>
                <template v-slot:[`item.optic`]="{ item }">
                    {{ writeToTableOptic(item) }}
                </template>
                <template v-slot:[`item.point`]="{ item }">
                    {{ writeToTableExam(item) }}
                </template>
            </v-data-table>
        </v-card>
        </div>
    </div>
</template>


<script>
export default{
    data: () => ({
        users: {
            "KullanıcıA":{
                "1":{
                    "A":["SINAV1[1,A,ABCDEF]","SINAV2[1,A,BCDEFA]"],
                    "E":["SINAV9[1,E,CDEFAB]","SINAV10[1,E,DEFABC]"]
                },
                "5":{
                    "B":["SINAV3[5,B,EFABCD]","SINAV4[5,B,FABCDE]"]
                }
            },
            "KullanıcıB":{
                "3":{
                    "C":["SINAV5[3,C,ABCCDE]","SINAV6[3,C,BCCDEA]"]
                },
                "7":{
                    "D":["SINAV7[7,D,CCDEAB]","SINAV8[7,D,CDEABC]"]
                }
            }
        },
        grades:[],
        branches:[],
        exams:[],
        studentData:[],
        selectedUser:"",
        selectedGrade:"",
        selectedBranch:"",
        selectedExam:"",
        

        students:[
            {
                id:1,
                name:"Ayşe Korkmaz",
                number:"123",
                userGroup:"KullanıcıA",
                class:"1",
                branchName:"A",
                examName:"SINAV1",
                optic:"ABCDEF",
                point:""
            },
            {
                id:2,
                name:"Ali Sefer",
                number:"456",
                userGroup:"KullanıcıA",
                class:"5",
                branchName:"B",
                examName:"SINAV3",
                optic:"EFABCD ",
                point:""
            },
            {
                id:3,
                name:"Ceylan Gül",
                number:"789",
                userGroup:"KullanıcıB",
                class:"3",
                branchName:"C",
                examName:"SINAV5",
                optic:"ABCCDE ",
                point:""
            },
            {
                id:4,
                name:"Hulusi Doğru",
                number:"902",
                userGroup:"KullanıcıB",
                class:"7",
                branchName:"D",
                examName:"SINAV7",
                optic:"CCDEAB ",
                point:""
            }
        ],

        //txt table
        headers: [
            {text: "Öğrenci No", value: "number"},
            {text: "Öğrenci Adı", value: "name"},
            {text: "Cevap Anahtarı", value: "optic"},
            {text: "Puan", value: "point"}
        ],

        //try txt
        file: null,
        content: [],
    }),
    watch: {
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
                };
                reader.readAsText(this.file);
            }else{
                this.content = "check the console for file output";            
            }
        },
        // okul numarası karşılaştırması
        readTxtForNumber(){
            console.log(typeof this.content)
            var lines = this.content.split('\n');
            for(var line = 0; line < lines.length; line++){
                var oneLine = lines[line];

                for(var value = 0; value<3 ;value++){
                    var numbersTxt = oneLine[0]+oneLine[1]+oneLine[2];
                    var numberLines = numbersTxt.split('\n');
                    for(var i = 0;i<numberLines.length;i++){
                        for(var k =0 ;k<this.students.length;k++){
                            if(numberLines[i]==this.students[k].number)
                            var comeNumber = numberLines[i];
                            console.log("Nolar :",comeNumber);
                        }                               
                    }
                }
            }
            
        },
        // cevap anahtarı için
        readTxtForAnswerKey(){
            var lines = this.content.split('\n');
            for(var line = 0; line < lines.length; line++){
                var oneLine = lines[line];
                   
                for(var b = 3;b<oneLine.length;b++){
                    var answerIndex = oneLine[b];//indisli alıyor txt deki---öğrenci cevapları
                    console.log("Öğrenci"+b+":",answerIndex);
                }     
            }
            for(var m = 0;m<this.students.length;m++){
                var opticAnswer=this.students[m].optic;
                for(b = 0;b<opticAnswer.length;b++){
                    var opticIndex = opticAnswer[b];//indisli alıyor json daki---cevap anahtarı          
                    console.log("Cevapa"+b+":",opticIndex);                    
                }           
            }           
        },
        //dropdown ve students daki dataları kıyaslayıp tabloya veri göndermek
        writeToTableNumber(sendNumber){
            for(var h = 0;h<this.students.length;h++){
                if(this.selectedUser==this.students[h].userGroup && 
                    this.selectedGrade==this.students[h].class || 
                    this.selectedBranch==this.students[h].branchName && 
                    this.selectedExam==this.students[h].examName){

                        sendNumber = this.students[h];

                        return sendNumber.number;

                }
            }
        },
        writeToTableName(sendName){
            for(var h = 0;h<this.students.length;h++){
                if(this.selectedUser==this.students[h].userGroup && 
                    this.selectedGrade==this.students[h].class ||
                    this.selectedBranch==this.students[h].branchName && 
                    this.selectedExam==this.students[h].examName){

                        sendName = this.students[h];

                        return sendName.name;
                }
            }
        },
        writeToTableOptic(sendOptic){
            for(var h = 0;h<this.students.length;h++){
                if(this.selectedUser==this.students[h].userGroup && 
                    this.selectedGrade==this.students[h].class || 
                    this.selectedBranch==this.students[h].branchName && 
                    this.selectedExam==this.students[h].examName){

                        sendOptic = this.students[h];

                        return sendOptic.optic;
                }
            }
        },
        writeToTableExam(){
        
        },
        
        //edit için
        save() {},
        cancel() {},
        open() {},
        close() {}
    }
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