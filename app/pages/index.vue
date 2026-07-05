<template>
	<div class="">
		<div class="px-6 py-8">
			<div class="flex gap-6">
				<div class="space-y-6 w-full">
					<div class="flex gap-10 justify-between">
						<ProductCard />
						<ResourseCard />
					</div>
					<FarmCard />
					<VillageCard />
				</div>
				<div class="flex flex-col gap-4 basis-3xs">
					<TroopsCard />
					<Town />
				</div>
			</div>
		</div>
	</div>
</template>
