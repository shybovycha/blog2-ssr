{#if date}
    <time>{ formattedDate } at { formattedTime }</time>
{:else}
    <time>{ defaultDate } (maybe)</time>
{/if}

<script>
    import { format } from 'date-fns';

    export let date;

    const formattedDate = format(date, 'dd MMM yyyy', new Date());
    const formattedTime = format(date, 'HH:mm', new Date());

    const defaultDate = format(new Date(), 'dd MMM yyyy', new Date());
</script>