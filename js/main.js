var app = new Vue({
    el: '#app',
    data: {
        items: null,
        keyword: '',
        message: ''
    },
    watch: {
        // 入力値を監視
        keyword: function(newKeyword, oldKeyword){
            //console.log(newKeyword)
            // 入力中の表示
            this.message = 'Waiting for you to stop typing...'

            // 一文字ごとに通信するのを避けてApiに負荷をかけないようにする
            this.debouncedGetAnswer()
        }
    },
    created: function(){
        // this.keyword = 'JavaScript'
        // this.getAnswer()

        // lodash _.debounce
        // 規定時間内に同じイベントが発生した場合は処理を実行しない
        // （一定時間止まったら実行）
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)

    },
    methods: {
        getAnswer: function(){
            if(this.keyword === ''){
                this.items = null
                this.message = ''
                return
            }

            this.message='Loading...'
            var vm = this
            var params = {page: 1, per_page: 20, query: this.keyword}
            axios.get('https://qiita.com/api/v2/items', {params})
                .then(function(response){
                    console.log(response)
                    vm.items = response.data
                })
                .catch(function(error){
                    vm.message = 'Error!' + error
                })
                .finally(function(){
                    vm.message = ''
                })
        }
    }
})