<template>
	<van-nav-bar title="About  MGlobal" left-arrow @click-left="onClickLeft" />

	<div class="all">

		<p>
		<h1>Terms of VJ</h1>
		</p>

		<p>1. When applying to use the MLive's APP Services, the VJ must provide accurate personal information and promptly
			update the information if any changes occur, and upon request from the MLive, provide evidence to verify
			accuracy of the information given.</p>

		<p>2. The VJ shall not transfer or loan his account or password to others. The VJ shall immediately notify the MLive
			if he discovers unlawful use of his account by others. The MLive shall not bear any liability, in whatsoever
			forms, if hacking or user negligence results in the unlawful use by others of the VJ's account or password.</p>

		<p>3. The VJ agrees that the MLive has the right to, when providing APP Services, place any type of commercial
			advertisement in any form or other types of commercial information (including, but not limited to, the placement
			of advertisements on any page of the MLive website). The VJ also agrees to receive promotional or other relevant
			commercial information from the MLive via email or other methods.</p>

		<p>4. By using and/or uploading any content through a MLive APP Services (including but not limited to forums,
			Facebook, Twitter, comments or personal microblogs) to publicly accessible areas of the MLive website, the VJ
			grants to the MLive the permission, free, permanent, irrevocable, non-exclusive and fully sub-licensable rights
			and license, without any territorial or time limitations and without requiring any approvals and/or
			compensations, to use, copy, modify, adapt, publish, translate, edit, dispose, create derivate works of,
			distribute, perform and publicly display such content (in whole or in part), and/or incorporate such content
			into existing or future forms of work, media or technology.</p>

		<p>5. While using the MLive APP Services, the VJ must abide by the following:</p>

		<ol class="list_none">

			<p>5.1 The VJ shall comply with all applicable laws and regulations in Thailand;</p>

			<p>5.2 The VJ shall comply with all agreements, stipulations and procedures applicable to the APP Services;</p>

			<p>5.3 The VJ shall not use the APP Services system for any unlawful purpose which is in violation of the
				prevailing laws, decency and public policy;</p>

			<p>5.4 The VJ shall not, in any shape or form, use MLive APP Services to infringe upon the commercial interests
				of the MLive, including but not limited to the posting of commercial advertisements without the express
				permission of the MLive Community;</p>

			<p>5.5 The VJ shall not use the MLive APP Services system to engage in behavior that may adversely impact the
				normal operation of the internet or cellular network;</p>

			<p>5.6 The VJ shall not use APP Services provided by the MLive to upload, display or distribute any false,
				harassing, harmful, abusive, threatening, vulgar or obscene messages or information, or any other type of
				unlawful messages or information;</p>

			<p>5.7 The VJ shall not infringe upon the patents, copyrights, trademarks, right to reputation or any other
				legal rights and interests of any third party;</p>

			<p>5.8 The VJ shall not use the MLive APP Services system to engage in any behavior detrimental to the interests
				of the MLive;</p>

		</ol>

		<p>6. The MLive has the right to review and monitor the VJ's usage of the MLive APP Services (including, but not
			limited to, review of content stored by the VJ on the MLive website). If the MLive, at its sole discretions,
			reasonably consider that the VJ violates any of the aforementioned stipulations when using the APP Services, the
			MLive or its authorized agent has the right to request the VJ to rectify the situation or to directly take all
			necessary measures (including, but not limited to, modifying or deleting the content posted by the VJ, or
			suspension or termination of the VJ's rights to use the APP Services) to mitigate the impact of the VJ's
			improper conduct without requiring any approval from the VJ.</p>

		<p>7. Any disclaimers, notifications or cautions regarding the usage of particular MLive APP Services, which are
			issued through various methods (including, but not limited to, webpage announcements, emails and SMS reminders)
			shall be deemed to form part of this Agreement. Usage of such APP Services shall be deemed to be a confirmation
			of the VJ's acceptance of the content of such disclaimers, notifications and cautions.</p>

		<p>8. The MLive will limit access to information about the VJ to employees who we believe reasonably need to come
			into contact with that information to provide products or services to the VJ or in order to do their jobs</p>

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