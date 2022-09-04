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
                    <option value="">Aktif Sınav Seçiniz</option>
                    <option v-for="(branchIndex) in exams" :key="branchIndex.id">{{ branchIndex }}{{ branchIndex.id }}</option>
                </select>
            </div>
            <!-- txt dosyasını yükleyen buton -->
            <input 
                v-show="true" 
                accept=".txt"
                ref="doc"
                type="file"                 
                id="upload"
                class="mt-5 ml-16"
            />
            <v-btn 
                class="" 
                color="primary" 
                width="130px" 
                @click="importTxt"
            >
                Oku
            </v-btn>
        </div>
        <!-- txt dosyası yüklemek/görüntülemek -->
        <div class="table-buttons">
            <div class="uploadTxt mt-10 ml-5">
                <v-card class="data-table">
                    <v-data-table
                        item-key="queue"
                        :headers="headers"
                        :items="students"
                    >
                        <template v-slot:body="{items,headers}">
                            <tbody>
                                <tr v-for="(item,idx,k) in items" :key="idx" :value="k"> 
                                    <td v-for="(header,key) in headers" :key="key" :value="key">
                                        <v-edit-dialog
                                            v-model="item[header.value]"
                                            @save="save"
                                            @open="open"
                                            @close="close"
                                            large      
                                        >
                                            {{item[header.value]}}
                                            <template v-slot:input>
                                                <v-text-field
                                                    v-model="item[header.value]"
                                                    label="Edit"
                                                    single-line
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
            <div class="buttons ml-auto">
                <div class="mt-3 d-flex flex-column-reverse">
                    <v-btn class="mt-4" color="primary" @click="$refs.doc.click()" width="130px">
                        Kaydet
                    </v-btn>
                    <v-btn class="mt-3" color="primary" @click="$refs.doc.click()" width="130px">
                        Değerlendir
                    </v-btn>
                </div>
            </div>
        </div>
        <!-- <div>
            {{ content }}
        </div> -->
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
        selectedUser:"",
        selectedGrade:"",
        selectedBranch:"",
        selectedExam:"",
        

        students:[
            {
                id:1,
                name:"Ayşe Korkmaz",
                number:"123",
                class:"1",
                branchName:"A",
                examName:"SINAV1"
            },
            {
                id:2,
                name:"Ali Sefer",
                number:"456",
                class:"5",
                branchName:"B",
                examName:"SINAV3"
            },
            {
                id:3,
                name:"Ceylan Gül",
                number:"789",
                class:"3",
                branchName:"C",
                examName:"SINAV5"
            },
            {
                id:4,
                name:"Hulusi Doğru",
                number:"902",
                class:"7",
                branchName:"D",
                examName:"SINAV7"
            }
        ],

        //txt table
        headers: [
            {text: "Sıra", value: "id"},
            {text: "Öğrenci No", value: "number"},
            {text: "Öğrenci Adı", value: "name"},
            {text: "Cevap Anahtarı", value: "answerKey"},
            {text: "Puan", value: "score"}
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
                reader.onerror = (err) =>console.log(err);
                reader.readAsText(this.file);
                this.readContent();
            }else{
                this.content = "check the console for file output";
                // reader.onload = (res) => {
                //     console.log(res.target.result);
                // };
                // reader.onerror = (err) => console.log(err);
                // reader.readAsText(this.file);                
            }
        },
        readContent(){
            //tek tek elemanları gezer
            // let i;
            // for(i=3;i<10;i++){
            //     console.log("Okul No:",this.content[i]);
            // }
            this.content;
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
  margin-left:20px;
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
.uploadTxt{
    max-width: 85%;
}
.buttons{
    max-width: 11%;
    margin-top: -350px;
    margin-left: 30px;
}

</style>