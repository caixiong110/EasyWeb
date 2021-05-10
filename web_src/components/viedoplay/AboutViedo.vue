<template>
    <div>
        <div class="row mb-5">
            <div class="col-4">
                 <!--导航--->
                <div calss="list-group mb-5">
                    <router-link tag="li" class="nav-link" to="/viedoplay/News">
                        <a class="list-group-item list-group-item-action">最新新闻</a>
                    </router-link>
                     <router-link tag="li" class="nav-link" to="/viedoplay/Contact">
                        <a class="list-group-item list-group-item-action">联系方式</a>
                    </router-link>
                     <router-link tag="li" class="nav-link" to="/viedoplay/Guide">
                        <a class="list-group-item list-group-item-action">文档指导</a>
                    </router-link>
                    <router-link tag="li" class="nav-link" to="/viedoplay/Donate">
                        <a class="list-group-item list-group-item-action">捐赠方式</a>
                    </router-link>
                </div>
        </div>
                <div class="col-8">
                    <!--导航对应的内容-->
                    <router-view></router-view>
                </div>
        </div>
           
    </div>
</template>

<script>
import News from 'components/viedoplay/News'
import Contact from 'components/viedoplay/Contact'
import Guide from 'components/viedoplay/Guide'

export default {
    components:{
    News,Contact,Guide
  }
}
</script>


