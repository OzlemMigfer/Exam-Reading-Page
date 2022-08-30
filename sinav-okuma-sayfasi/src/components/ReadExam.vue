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
                <select id="branchSelect" v-model="selectedBranch"  :required="true">
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
            <div class="d-md-inline-flex ml-16">
                <v-btn color="primary" @click="$refs.inputUpload.click()">
                    Dosya Seç
                </v-btn>
                <input 
                    v-show="false" 
                    accept=".txt"
                    ref="inputUpload" 
                    type="file" 
                    @change="importTxt" 
                />
            </div>
        </div>
        <!-- txt dosyası yüklemek/görüntülemek -->
        <div class="uploadTxt mt-10 ml-5">
            <v-data-table
                class="data-table"
                id="showStudentData"
                v-model="showed"
                item-key="sıra"
                show-select 
                :headers="headers"
                :items="data"
                short-by="sıra"
            >
            </v-data-table>
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
        selectedUser:"",
        selectedGrade:"",
        selectedBranch:"",
        selectedExam:"",
        

        students:{
            "student1":{
                "name":"Ayşe Korkmaz",
                "number":"123",
                "grade":"1",
                "branch":"A",
                "exam":"SINAV1"
            },
            "student2":{
                "name":"Ali Sefer",
                "number":"456",
                "grade":"5",
                "branch":"B",
                "exam":"SINAV3"
            },
            "student3":{
                "name":"Ceylan Gül",
                "number":"789",
                "grade":"3",
                "branch":"C",
                "exam":"SINAV5"
            },
            "student4":{
                "name":"Hulusi Kent",
                "number":"902",
                "grade":"7",
                "branch":"D",
                "exam":"SINAV7"
            }
        },
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
    }
}
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
    margin-right: 355px
}
</style>