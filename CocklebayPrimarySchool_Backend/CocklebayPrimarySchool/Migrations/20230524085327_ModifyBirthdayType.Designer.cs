﻿// <auto-generated />
using System;
using CocklebayPrimarySchool;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CocklebayPrimarySchool.Migrations
{
    [DbContext(typeof(SchoolDbContext))]
    [Migration("20230524085327_ModifyBirthdayType")]
    partial class ModifyBirthdayType
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CocklebayPrimarySchool.ExamScore", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Grade")
                        .HasColumnType("int");

                    b.Property<double>("Score")
                        .HasColumnType("float");

                    b.Property<string>("StudentNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Subject")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TestDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ExamScores", (string)null);
                });

            modelBuilder.Entity("CocklebayPrimarySchool.Room", b =>
                {
                    b.Property<string>("RoomNo")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("TeacherNo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoomNo");

                    b.ToTable("Rooms", (string)null);
                });

            modelBuilder.Entity("CocklebayPrimarySchool.Student", b =>
                {
                    b.Property<string>("StudentNo")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("DateOfBirthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoomNo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StudentNo");

                    b.ToTable("Students", (string)null);
                });

            modelBuilder.Entity("CocklebayPrimarySchool.Teacher", b =>
                {
                    b.Property<string>("TeacherNo")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("DateOfBirthday")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TeacherNo");

                    b.ToTable("Teachers", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
