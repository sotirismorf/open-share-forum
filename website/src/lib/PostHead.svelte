<script lang="ts">
	import type { User } from "$entities/User"
	export let user: User;
</script>
<a
	class="flex flex-row gap-2 items-center"
	href="/profile/{user.username}"
>
	<div class="w-6 h-6 bg-black rounded-full"></div>

	<span class="text-lg hover:text-slate-400">{user.handle}</span>
	<span class="text-gray-400">@{user.username}</span>
</a>
