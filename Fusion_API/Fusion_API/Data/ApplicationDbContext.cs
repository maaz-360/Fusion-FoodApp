using Fusion_API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using static System.Net.Mime.MediaTypeNames;

namespace Fusion_API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {


        }

        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<OrderHeader> OrderHeaders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<MenuItem>().HasData(new MenuItem
            {
                Id = 1,
                Name = "Grilled Carrots",
                Description = "Fusc tincidunt maximus Leo",
                Image = "images/carrot.jpg",
                Price = 7.99,
                Category = "Starters",
                SpecialTag = ""
            },
            new MenuItem
            {
                 Id = 2,
                 Name = "Chocolate Brownie",
                 Description = "Rich chocolate brownie with nuts",
                 Image = "images/Chocolate_Brownie.jpg",
                 Price = 5.49,
                 Category = "Dessert",
                 SpecialTag = "Best Seller"
            },
            new MenuItem
            {
                 Id = 3,
                 Name = "Veg Cheese Burger",
                 Description = "Loaded veggie burger with cheese",
                 Image = "images/Veg_Cheese_Burger.jpg",
                 Price = 6.99,
                 Category = "Burger",
                 SpecialTag = ""
            },
            new MenuItem
            {
                Id = 4,
                Name = "Chicken Burger",
                Description = "Grilled chicken patty with mayo",
                Image = "images/Chicken_Burger.jpg",
                Price = 8.49,
                Category = "Burger",
                SpecialTag = "Popular"
            },
            new MenuItem
            {
                Id = 5,
                Name = "Margherita Pizza",
                Description = "Classic pizza with mozzarella cheese",
                Image = "images/Margherita_Pizza.jpg",
                Price = 9.99,
                Category = "Pizza",
                SpecialTag = ""
             },
            new MenuItem
            {
                 Id = 6,
                 Name = "Pepperoni Pizza",
                 Description = "Pepperoni with extra cheese",
                 Image = "images/Pepperoni_Pizza.jpg",
                 Price = 11.49,
                 Category = "Pizza",
                 SpecialTag = "Chef's Special"
            },
            new MenuItem
            {
                Id = 7,
                Name = "French Fries",
                Description = "Crispy golden french fries",
                Image = "images/French_Fries.jpg",
                 Price = 3.99,
                Category = "Snacks",
                SpecialTag = ""
            },
            new MenuItem
            {
                Id = 8,
                Name = "Cold Coffee",
                Description = "Chilled coffee with ice cream",
                Image = "images/Cold_Coffee.jpg",
                Price = 4.99,
                Category = "Beverage",
                SpecialTag = ""
            },
            new MenuItem
            {
                Id = 9,
                Name = "Fresh Lime Soda",
                Description = "Refreshing lemon soda",
                Image = "images/Fresh_Lime_Soda.jpg",
                Price = 2.99,
                Category = "Beverage",
                SpecialTag = "Best Seller"
            }
            );
        }

    }
}
