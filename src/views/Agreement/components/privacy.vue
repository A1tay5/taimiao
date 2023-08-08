<template>
    <van-nav-bar title="About  MGlobal" left-arrow @click-left="onClickLeft" />

    <div class="all">

        <p>
        <h1>Privacy Protection</h1>
        </p>

        <p>1. The protection of user privacy is a fundamental policy of the MLive. The MLive guarantees that it will not
            publicly disclose or provide a third party with an individual user's registered information or non-public
            content, which is stored in the MLiveCommunity during the use of APP Services. However, the following
            circumstances are excluded:</p>

        <ol class="list_none">
            <p>1.1 When prior express authorization is obtained from the User;</p>

            <p>1.2 When and as required by applicable laws and regulations;</p>

            <p>1.3 When and as required by relevant competent authorities of the government;</p>

            <p>1.4 When it is necessary to safeguard the public interest;</p>

            <p>1.5 When it is necessary to safeguard the legal rights and interests of the MLive.</p>
        </ol>

        <p>2. The MLive may collaborate with a third party to provide the User with relevant APP Services. In this scenario,
            the MLive has the right to share the User's registered information with a third party, if the third party agrees
            to bear responsibility for providing privacy protection equivalent to that of the MLive.</p>

        <p>3. Under the condition that no private information of an individual user is disclosed, the MLive has the right to
            analyze the entire user database and utilize the database for commercial purposes.</p>

        <p>4. The User acknowledges and agrees that the User may, directly or indirectly, provide any of its personal
            information through its use of the Web Services and as provided under this Agreement. For the purposes of this
            article, the User hereby agrees and consents to the use of the User&rsquo;s personal information by the MLive,
            and such shall be considered as the consent as stipulated under the prevailing Thailand laws.</p>

    </div>
</template>
<script setup  lang="ts">
import './about.css'
const emit = defineEmits(["refresh"]);

const onClickLeft = () => {
    emit("refresh")

}

</script>
<style lang="scss" scoped></style>