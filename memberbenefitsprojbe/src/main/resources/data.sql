-- Insert sample Plans
INSERT INTO plan (id, name, network_name, plan_year)
VALUES
    ('f23a13cb-10d2-4f60-9dc1-9b0a6cb134a9', 'Gold PPO', 'Prime', 2025),
    ('b6ff04f7-5c23-4aa1-b6f1-38142e9d52c3', 'Silver HMO', 'Optima', 2025);

-- Insert sample Enrollments
INSERT INTO enrollment (id, member_id, coverage_start, plan_id)
VALUES
    ('a7d1e8aa-3c2a-45b7-9110-789c9f7e1234', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '2025-01-01', 'f23a13cb-10d2-4f60-9dc1-9b0a6cb134a9'),
    ('c1aa9ce9-5e55-4aa3-8dc5-17b84c9a2f91', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '2025-02-15', 'b6ff04f7-5c23-4aa1-b6f1-38142e9d52c3');

INSERT INTO users (id, auth_provider, auth_sub, created_at, email, updated_at)
VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef','google','213345664564651','2025-02-15','fake@email.com','2025-02-15')
    cdb7f9c5-226c-4e64-91c5-dfd8bb4d16ba,http://indiatimes.com,123456789,scottill0@sphinn.com,1/30/2025,7/4/2025
83315ca6-e51f-4059-8d87-c53da8e7c5d1,https://google.pl,123456790,jrendell1@sbwire.com,2/24/2025,6/18/2025
09f10b53-1719-4cb7-bd4c-5a28a3509e01,http://ftc.gov,123456791,rkiffe2@amazon.co.uk,8/20/2025,3/28/2025
632d2dae-2759-4f94-a9f1-94e3dadaf13f,https://un.org,123456792,lfrantzeni3@unblog.fr,2/18/2025,2/16/2025
1f935ed7-6459-4621-a882-9c1aacdb5b9f,http://shareasale.com,123456793,singlese4@jiathis.com,4/27/2025,3/19/2025
e2e61c45-0968-4dc9-bec9-d65bdfa1685e,http://wikia.com,123456794,cballston5@tuttocitta.it,10/10/2025,7/23/2025
5490b5ba-642b-4661-b72b-9444ad48945b,http://booking.com,123456795,ovignal6@mapy.cz,2/27/2025,1/26/2025
025459a4-2e17-41a4-a3bd-a11f3d40cb30,http://biglobe.ne.jp,123456796,gcourson7@cnet.com,10/31/2024,1/19/2025
4f3296e7-5e13-4bc8-9240-06389c0cf8e2,https://adobe.com,123456797,jmusslewhite8@purevolume.com,12/21/2024,11/26/2024
e507d8c0-13dd-44c2-b0d7-47db32d10a21,https://dailymotion.com,123456798,hmcamish9@deliciousdays.com,10/17/2025,9/4/2025)
3c6b7333-df21-44ce-9907-8d783bfb55ca,http://soup.io,123456799,whabbemaa@wunderground.com,5/26/2025,10/21/2024)
95d99ec2-aaaf-49f1-a926-e2971262fdba,http://skype.com,123456800,hbahlmannb@friendfeed.com,5/25/2025,5/9/2025)
f1a86f2c-e206-4a12-8e34-2f3788ff3b71,http://prlog.org,123456801,lstedmanc@newsvine.com,1/1/2025,6/29/2025)
6a06f90a-c503-4225-8c27-0de4ded29362,https://homestead.com,123456802,eklejnad@google.cn,6/25/2025,5/8/2025)
b8d1e515-2e20-422a-a0c2-36db1a5fd456,http://ft.com,123456803,qmclarense@privacy.gov.au,4/29/2025,4/23/2025)
92b67c8b-5491-40bf-9c97-0de0732f58e9,http://sciencedaily.com,123456804,mdronsfieldf@tinyurl.com,12/7/2024,12/10/2024)
58e47dae-0641-47b3-878e-ad7a0e29d740,https://multiply.com,123456805,tlefeaverg@ustream.tv,12/20/2024,4/24/2025)
e700aa95-9f74-486f-9abf-6ab55eaa5d78,https://is.gd,123456806,tpantinh@cpanel.net,10/7/2025,11/18/2024)
fbdf9a06-eafd-463c-97ee-d4324d575a8b,https://jalbum.net,123456807,fbarritti@alexa.com,9/19/2025,10/6/2025)
c1fb9f7b-4310-4276-86b0-a0a65e790dc3,http://dot.gov,123456808,kampsj@newyorker.com,6/19/2025,6/19/2025)
5312421f-41df-43d0-b9b7-5d3512ecb928,https://independent.co.uk,123456809,aduthiek@gnu.org,1/9/2025,1/21/2025)
(767ca469-fd49-4bb1-ba2f-f6ebce042a5d,https://imageshack.us,123456810,pmcaulayl@spiegel.de,3/4/2025,4/8/2025)
(c099b182-5a27-435b-b4a4-362b83e0b2de,http://de.vu,123456811,bmacailinem@google.fr,8/21/2025,10/14/2025);