<template>
    <div class="page-header" :style="{borderBottomColor: showUser ? 'transparent' : ''}">
        <div class="left-logo"
            @click="toHome"
        >
            <img :src="require('@assets/icons/logo.png')"
                 alt="logo"
                 class="logo"
            />
            <a href="javascript:void(0);" class="paga-name">A.I.智慧媒体云平台</a>
        </div>

        <div v-if="showUser" class="right-user-msg">
            <span class="named">尊敬的{{userInfo.role || '---'}}您好！</span>
            <div class="user-center">
                <img :src="require('@assets/images/user_image.png')"
                     alt="user"
                     class="user-img"
                />
                <span class="name">{{userInfo.name || '---'}}</span>
                <span class="rotate-pointer">
                    <img :src="require('@assets/icons/arrow_0.png')"
                         alt="arrow"
                         class="arrow"
                    />
                </span>

                <div class="user-opitons">
                    <ul class="option-list">
                        <li class="list-item">修改密码</li>
                        <li 
                            class="list-item"
                            @click="layout"    
                        >退出登录</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Tools from '@untils/index.js';

    export default {
        name: 'pageHeader',

        created() {
            this.routerPath = Tools.routerPath.bind(this)
        },

        computed: {
            ...mapGetters('login', {
                userInfo: 'getUserInfo'
            }),

            showUser() {
                return !!Object.keys(this.userInfo).length;
            }
        },

        methods: {
            
            ...mapActions('login', ['setStateData']),

            toHome() {
                if (!this.showUser)
                    return false;
                this.routerPath('/home');
            },

            layout() {
                this.setStateData({property: 'userInfo', data: {}});
                this.routerPath('/');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-header {
        width: 100%;
        height: 60px;
        padding: 0 20px;
        border-bottom: $bb1;
        @include flex_layout(row, space-between, center);

        .left-logo {
            height: 100%;
            @include flex_layout(row, flex-start, center);

            .logo {
                margin-right: 15px;
            }

            .paga-name {
                font-size: $fzml;
                color: $cor0;
            }
        }

        .right-user-msg {

            @include flex_layout(row, flex-start, center);

            .named, .name {
                font-size: $fzn;
                color: $cor0;
            }

            .user-center {
                margin-left: 10px;
                height: 40px;
                padding-right: 25px;
                cursor: pointer;
                @include flex_layout(row, flex-start, center);
                @include position();

                .user-img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }

                .name {
                    margin: 0 5px 0 10px;
                }

                .rotate-pointer {
                    width: 1px;
                    height: 1px;
                    @include position_center(absolute, right, 13px);
                    @include transition_animate(transform, 0.3s, linear);

                    .arrow {
                        width: 15px;
                        @include position_center();

                    }
                }

                .user-opitons {
                    display: none;
                    width: 100%;
                    padding-top: 10px;
                    @include position_center(absolute, top, 100%);

                    .option-list {
                        width: 100%;
                        font-size: $fzn;
                        color: $cor0;
                        text-align: center;

                        .list-item {
                            line-height: 36px;

                            &:hover {
                                color: $cor2;
                            }
                        }
                    }
                }

                &:hover {
                    .rotate-pointer {
                        transform: rotate(180deg);
                    }

                    .user-opitons {
                        display: block;
                    }
                }
            }
        }
    }
</style>