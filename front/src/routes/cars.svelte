<script>
    export let car;
</script>


<div class="container">
    <li class="car">
        <p><strong>Make:</strong> {car.make}</p>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Model:</strong> {car.model}</p>
        <p><strong>Type:</strong> {car.type}</p>
    </li>
</div>

<style>
    .container {
        margin-bottom: 20px;
    }

    .car {
        list-style-type: none;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    .car p {
        margin: 5px 0;
    }
</style>