using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fusion_API.Migrations
{
    /// <inheritdoc />
    public partial class SeedMenuItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "MenuItems",
                columns: new[] { "Id", "Category", "Description", "Image", "Name", "Price", "SpecialTag" },
                values: new object[,]
                {
                    { 1, "Dessert", "Fusc tincidunt maximus Leo", "", "Carrot Love", 7.9900000000000002, "" },
                    { 2, "Dessert", "Rich chocolate brownie with nuts", "", "Chocolate Brownie", 5.4900000000000002, "Best Seller" },
                    { 3, "Burger", "Loaded veggie burger with cheese", "", "Veg Cheese Burger", 6.9900000000000002, "" },
                    { 4, "Burger", "Grilled chicken patty with mayo", "", "Chicken Burger", 8.4900000000000002, "Popular" },
                    { 5, "Pizza", "Classic pizza with mozzarella cheese", "", "Margherita Pizza", 9.9900000000000002, "" },
                    { 6, "Pizza", "Pepperoni with extra cheese", "", "Pepperoni Pizza", 11.49, "Chef Special" },
                    { 7, "Snacks", "Crispy golden french fries", "", "French Fries", 3.9900000000000002, "" },
                    { 8, "Beverage", "Chilled coffee with ice cream", "", "Cold Coffee", 4.9900000000000002, "" },
                    { 9, "Beverage", "Refreshing lemon soda", "", "Fresh Lime Soda", 2.9900000000000002, "Best Seller" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 9);
        }
    }
}
